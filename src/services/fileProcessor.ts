import { WordData, FileProcessingResult, Trie } from '@/types';
import { doubleMetaphone, levenshteinDistance } from '@/utils/algorithms';

// Web Worker script for file processing
const workerScript = `
  const parseWordFromCell = (cellValue) => {
    if (!cellValue) return '';
    const cellString = String(cellValue).trim();
    const parenthesisIndex = cellString.indexOf('(');
    return parenthesisIndex > 0 ? cellString.substring(0, parenthesisIndex).trim() : cellString;
  };

  const parseRepeatCount = (cellValue) => {
    if (!cellValue) return 0;
    const match = String(cellValue).trim().match(/^[0-9]+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  self.onmessage = (e) => {
    const { file } = e.data;
    importScripts("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const bstr = event.target.result;
        const wb = self.XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = self.XLSX.utils.sheet_to_json(ws, { header: 1 });
        
        if (jsonData.length < 5) {
          throw new Error("Sheet has too few words for MCQs.");
        }
        
        const allWords = [];
        const rows = jsonData.slice(1);
        
        rows.forEach(row => {
          if (!row || !row[1] || !row[2]) return;
          const parsedWord = parseWordFromCell(row[2]);
          if (!parsedWord) return;
          
          const wordObject = {
            sentence: String(row[1]).trim(),
            word: parsedWord,
            fullWordInfo: String(row[2]).trim(),
            repeatCount: parseRepeatCount(row[4])
          };
          allWords.push(wordObject);
        });
        
        if (allWords.length < 5) {
          throw new Error("Not enough valid data.");
        }
        
        self.postMessage({ status: 'success', data: allWords });
      } catch (err) {
        self.postMessage({ status: 'error', error: err.message });
      }
    };
    reader.readAsBinaryString(file);
  };
`;

class FileProcessorService {
  private worker: Worker | null = null;

  constructor() {
    this.initializeWorker();
  }

  private initializeWorker() {
    try {
      const workerBlob = new Blob([workerScript], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(workerBlob);
      this.worker = new Worker(workerUrl);
    } catch (error) {
      console.error('Failed to initialize worker:', error);
    }
  }

  async processFile(file: File): Promise<FileProcessingResult> {
    return new Promise((resolve) => {
      if (!this.worker) {
        resolve({ status: 'error', error: 'Worker not available' });
        return;
      }

      const timeout = setTimeout(() => {
        resolve({ status: 'error', error: 'Processing timeout' });
      }, 30000); // 30 second timeout

      this.worker.onmessage = (e) => {
        clearTimeout(timeout);
        const { status, data, error } = e.data;
        
        if (status === 'success') {
          resolve({ status: 'success', data });
        } else {
          resolve({ status: 'error', error });
        }
      };

      this.worker.onerror = (error) => {
        clearTimeout(timeout);
        resolve({ status: 'error', error: error.message });
      };

      this.worker.postMessage({ file });
    });
  }

  buildDataStructures(words: WordData[]) {
    const trie = new Trie();
    const phoneticMap = new Map<string, string[]>();
    const difficultyScores = new Map<string, number>();

    // Build trie and phonetic map
    words.forEach(wordObj => {
      trie.insert(wordObj.word);
      
      const [primaryCode] = doubleMetaphone(wordObj.word);
      if (primaryCode) {
        if (!phoneticMap.has(primaryCode)) {
          phoneticMap.set(primaryCode, []);
        }
        phoneticMap.get(primaryCode)!.push(wordObj.word);
      }
    });

    // Calculate difficulty scores
    words.forEach(wordObj => {
      let score = 0;
      const [primaryCode] = doubleMetaphone(wordObj.word);
      const phoneticSiblings = (phoneticMap.get(primaryCode) || []).length - 1;
      
      score += phoneticSiblings * 2; // Phonetic similarity penalty
      score += wordObj.word.length / 5; // Length complexity
      score += wordObj.repeatCount * 0.5; // Frequency bonus
      
      difficultyScores.set(wordObj.word, score);
    });

    return {
      all: words,
      mostAsked: words.filter(item => item.repeatCount > 0),
      trie,
      phoneticMap,
      difficultyScores,
    };
  }

  generateMCQOptions(correctAnswer: WordData, allWords: WordData[], trie: Trie, phoneticMap: Map<string, string[]>, difficultyScores: Map<string, number>): string[] {
    const distractors = new Set<string>();
    const correctWord = correctAnswer.word.toLowerCase();
    const difficulty = difficultyScores.get(correctAnswer.word) || 0;

    // Strategy 1: Phonetic similarity for harder questions
    if (difficulty > 5) {
      const [primaryCode] = doubleMetaphone(correctWord);
      const phoneticCandidates = phoneticMap.get(primaryCode) || [];
      phoneticCandidates.forEach(candidate => {
        if (distractors.size < 3 && candidate.toLowerCase() !== correctWord) {
          distractors.add(candidate);
        }
      });
    }

    // Strategy 2: Edit distance similarity
    if (distractors.size < 3) {
      const candidates = allWords
        .map(item => ({ word: item.word, distance: levenshteinDistance(correctWord, item.word.toLowerCase()) }))
        .filter(item => item.distance > 0 && item.distance <= 2)
        .sort((a, b) => a.distance - b.distance);

      candidates.forEach(item => {
        if (distractors.size < 3 && !distractors.has(item.word) && item.word.toLowerCase() !== correctWord) {
          distractors.add(item.word);
        }
      });
    }

    // Strategy 3: Same starting letter
    if (distractors.size < 3) {
      const sameLetterWords = trie.findAllWordsWithPrefix(correctWord.charAt(0));
      sameLetterWords.sort(() => Math.random() - 0.5);
      
      sameLetterWords.forEach(word => {
        if (distractors.size < 3 && !distractors.has(word) && word.toLowerCase() !== correctWord) {
          distractors.add(word);
        }
      });
    }

    // Strategy 4: Random selection as fallback
    const randomPool = [...allWords].sort(() => Math.random() - 0.5);
    while (distractors.size < 3 && randomPool.length > 0) {
      const randomWord = randomPool.pop()?.word;
      if (randomWord && randomWord.toLowerCase() !== correctWord && !distractors.has(randomWord)) {
        distractors.add(randomWord);
      }
    }

    // Combine and shuffle
    const options = Array.from(distractors);
    options.push(correctAnswer.word);
    return options.sort(() => Math.random() - 0.5);
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export const fileProcessorService = new FileProcessorService();