export interface TestResult {
  id: string;
  userId: string;
  testMode: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  timeTaken?: number;
  completedAt: string;
  questionsData: any;
}

const TEST_RESULTS_KEY = 'exam_simulator_test_results';

const getTestResults = (): TestResult[] => {
  const resultsJson = localStorage.getItem(TEST_RESULTS_KEY);
  return resultsJson ? JSON.parse(resultsJson) : [];
};

const saveTestResults = (results: TestResult[]) => {
  localStorage.setItem(TEST_RESULTS_KEY, JSON.stringify(results));
};

export const testResultsService = {
  saveResult: (result: Omit<TestResult, 'id' | 'completedAt'>): TestResult => {
    const results = getTestResults();
    const newResult: TestResult = {
      ...result,
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
    };
    results.push(newResult);
    saveTestResults(results);
    return newResult;
  },

  getUserResults: (userId: string): TestResult[] => {
    const results = getTestResults();
    return results
      .filter((result) => result.userId === userId)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  },

  getResultById: (id: string): TestResult | null => {
    const results = getTestResults();
    return results.find((result) => result.id === id) || null;
  },

  deleteResult: (id: string): boolean => {
    const results = getTestResults();
    const filteredResults = results.filter((result) => result.id !== id);
    if (filteredResults.length < results.length) {
      saveTestResults(filteredResults);
      return true;
    }
    return false;
  },
};
