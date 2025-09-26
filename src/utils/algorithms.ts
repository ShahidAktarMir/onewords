/**
 * Double Metaphone algorithm (simplified implementation)
 * Used for phonetic matching of words
 */
export const doubleMetaphone = (str: string): [string, string] => {
  if (!str) return ['', ''];
  
  str = str.toUpperCase();
  let primary = '';
  const VOWELS = /[AEIOUY]/;
  
  // Handle initial vowel
  if (VOWELS.test(str[0])) {
    primary += 'A';
  }
  
  // Process each character
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const prev = str[i - 1];
    const next = str[i + 1];
    
    // Skip duplicate consonants (except C)
    if (char === prev && char !== 'C') continue;
    
    switch (char) {
      case 'B':
        primary += 'P';
        break;
      case 'C':
        if (next === 'H' || next === 'S') {
          primary += 'X';
        } else {
          primary += 'K';
        }
        break;
      case 'D':
        if (next === 'G') {
          primary += 'J';
        } else {
          primary += 'T';
        }
        break;
      case 'F':
      case 'J':
      case 'L':
      case 'M':
      case 'N':
      case 'R':
        primary += char;
        break;
      case 'G':
        if (next === 'H') {
          primary += 'K';
        } else {
          primary += 'K';
        }
        break;
      case 'H':
        if (VOWELS.test(prev) && VOWELS.test(next)) {
          primary += 'H';
        }
        break;
      case 'K':
        if (prev !== 'C') {
          primary += 'K';
        }
        break;
      case 'P':
        if (next === 'H') {
          primary += 'F';
        } else {
          primary += 'P';
        }
        break;
      case 'Q':
        primary += 'K';
        break;
      case 'S':
        if (next === 'H') {
          primary += 'X';
        } else {
          primary += 'S';
        }
        break;
      case 'T':
        if (next === 'H') {
          primary += '0';
        } else {
          primary += 'T';
        }
        break;
      case 'V':
        primary += 'F';
        break;
      case 'W':
        if (VOWELS.test(next)) {
          primary += 'W';
        }
        break;
      case 'X':
        primary += 'KS';
        break;
      case 'Y':
        if (VOWELS.test(next)) {
          primary += 'Y';
        }
        break;
      case 'Z':
        primary += 'S';
        break;
    }
  }
  
  return [primary, primary]; // Simplified - return same for both
};

/**
 * Levenshtein Distance algorithm
 * Calculates the minimum number of single-character edits required to change one word into another
 */
export const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  // Initialize first row and column
  for (let i = 0; i <= a.length; i++) {
    matrix[0][i] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[j][0] = j;
  }

  // Fill the matrix
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

/**
 * Jaccard Similarity
 * Measures similarity between two sets
 */
export const jaccardSimilarity = (setA: Set<string>, setB: Set<string>): number => {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
};

/**
 * Cosine Similarity for text
 * Measures the cosine of the angle between two vectors
 */
export const cosineSimilarity = (textA: string, textB: string): number => {
  const wordsA = textA.toLowerCase().split(/\W+/).filter(Boolean);
  const wordsB = textB.toLowerCase().split(/\W+/).filter(Boolean);
  
  const allWords = new Set([...wordsA, ...wordsB]);
  const vectorA: number[] = [];
  const vectorB: number[] = [];
  
  allWords.forEach(word => {
    vectorA.push(wordsA.filter(w => w === word).length);
    vectorB.push(wordsB.filter(w => w === word).length);
  });
  
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

/**
 * Fisher-Yates Shuffle Algorithm
 * Randomly shuffles an array in place
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Weighted Random Selection
 * Selects items based on their weights
 */
export const weightedRandomSelection = <T>(
  items: T[],
  weights: number[]
): T | null => {
  if (items.length !== weights.length || items.length === 0) {
    return null;
  }
  
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
};