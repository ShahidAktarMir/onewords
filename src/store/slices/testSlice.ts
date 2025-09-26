import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, TestResult, TestStats, TestMode } from '@/types';

interface TestSliceState {
  questions: Question[];
  currentQuestionIndex: number;
  timeLeft: number;
  initialTime: number;
  testMode: TestMode | null;
  selectedLetter: string | null;
  results: TestResult[];
  stats: TestStats | null;
  showSubmitModal: boolean;
  isTestActive: boolean;
}

const initialState: TestSliceState = {
  questions: [],
  currentQuestionIndex: 0,
  timeLeft: 0,
  initialTime: 0,
  testMode: null,
  selectedLetter: null,
  results: [],
  stats: null,
  showSubmitModal: false,
  isTestActive: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    startTest: (state, action: PayloadAction<{ questions: Question[]; mode: TestMode; letter?: string }>) => {
      const { questions, mode, letter } = action.payload;
      const initialTime = questions.length * 60; // 1 minute per question
      
      state.questions = questions;
      state.currentQuestionIndex = 0;
      state.timeLeft = initialTime;
      state.initialTime = initialTime;
      state.testMode = mode;
      state.selectedLetter = letter || null;
      state.isTestActive = true;
      state.results = [];
      state.stats = null;
      state.showSubmitModal = false;
    },
    
    updateQuestion: (state, action: PayloadAction<{ index: number; question: Partial<Question> }>) => {
      const { index, question } = action.payload;
      if (state.questions[index]) {
        state.questions[index] = { ...state.questions[index], ...question };
      }
    },
    
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = Math.max(0, Math.min(action.payload, state.questions.length - 1));
    },
    
    decrementTimer: state => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    
    submitTest: state => {
      state.isTestActive = false;
      state.showSubmitModal = false;
      
      // Calculate results
      state.results = state.questions.map(question => ({
        question,
        userAnswer: question.userAnswer,
        isCorrect: question.word.toLowerCase() === (question.userAnswer || '').toLowerCase(),
      }));
      
      // Calculate stats
      const correctAnswers = state.results.filter(r => r.isCorrect).length;
      const attemptedCount = state.results.filter(r => r.userAnswer).length;
      const timeTaken = state.initialTime - state.timeLeft;
      
      state.stats = {
        timeTaken,
        totalQuestions: state.questions.length,
        correctAnswers,
        attemptedCount,
        scorePercentage: state.questions.length > 0 ? Math.round((correctAnswers / state.questions.length) * 100) : 0,
        questionsPerMinute: timeTaken > 0 ? Number(((attemptedCount / timeTaken) * 60).toFixed(1)) : 0,
      };
    },
    
    showSubmitModal: state => {
      state.showSubmitModal = true;
    },
    
    hideSubmitModal: state => {
      state.showSubmitModal = false;
    },
    
    resetTest: () => initialState,
  },
});

export const {
  startTest,
  updateQuestion,
  setCurrentQuestionIndex,
  decrementTimer,
  submitTest,
  showSubmitModal,
  hideSubmitModal,
  resetTest,
} = testSlice.actions;

export default testSlice.reducer;