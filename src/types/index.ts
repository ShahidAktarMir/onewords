export interface WordData {
  sentence: string;
  word: string;
  fullWordInfo: string;
  repeatCount: number;
}

export interface Question extends WordData {
  options: string[];
  userAnswer: string;
  status: 'not-answered' | 'answered' | 'review';
}

export interface TestResult {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
}

export interface TestStats {
  timeTaken: number;
  totalQuestions: number;
  correctAnswers: number;
  attemptedCount: number;
  scorePercentage: number;
  questionsPerMinute: number;
}

export interface SubmissionSummary {
  answered: number;
  review: number;
  notAnswered: number;
}

export interface ProcessedWordData {
  all: WordData[];
  mostAsked: WordData[];
  trie: Trie;
  phoneticMap: Map<string, string[]>;
  difficultyScores: Map<string, number>;
}

export type AppState = 'import' | 'selectMode' | 'test' | 'results';

export type TestMode = 'letter' | 'mostAsked' | 'full';

export interface PerformanceTier {
  name: string;
  color: string;
  minScore: number;
}

// Data Structures
export class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfWord = false;
  word: string | null = null;
}

export class Trie {
  root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    node.word = word;
  }

  findAllWordsWithPrefix(prefix: string): string[] {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    
    const words: string[] = [];
    this._collectAllWords(node, words);
    return words;
  }

  private _collectAllWords(node: TrieNode, words: string[]): void {
    if (node.isEndOfWord && node.word) {
      words.push(node.word);
    }
    for (const char in node.children) {
      this._collectAllWords(node.children[char], words);
    }
  }
}

// API Response Types
export interface FileProcessingResult {
  status: 'success' | 'error';
  data?: WordData[];
  error?: string;
}

// UI Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface IconProps extends BaseComponentProps {
  size?: number;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: number;
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';

// Accessibility Types
export interface A11yProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
}