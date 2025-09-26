import { PerformanceTier } from '@/types';

export const APP_CONFIG = {
  name: 'SSC CGL Exam Simulator',
  version: '1.0.0',
  author: 'Shahid Aktar Mir',
  description: 'Ultimate MCQ - One Word Substitution',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedFileTypes: ['.xlsx', '.xls', '.csv'],
  defaultTestDuration: 60, // seconds per question
  minWordsRequired: 5,
  minWordsForDistractors: 4,
} as const;

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  { name: 'Master', color: 'text-green-500', minScore: 90 },
  { name: 'Expert', color: 'text-blue-500', minScore: 75 },
  { name: 'Practitioner', color: 'text-warning-500', minScore: 50 },
  { name: 'Novice', color: 'text-error-500', minScore: 0 },
];

export const QUESTION_STATUS = {
  NOT_ANSWERED: 'not-answered',
  ANSWERED: 'answered',
  REVIEW: 'review',
} as const;

export const TEST_MODES = {
  LETTER: 'letter',
  MOST_ASKED: 'mostAsked',
  FULL: 'full',
} as const;

export const APP_STATES = {
  IMPORT: 'import',
  SELECT_MODE: 'selectMode',
  TEST: 'test',
  RESULTS: 'results',
} as const;

export const KEYBOARD_SHORTCUTS = {
  SUBMIT_TEST: 'Enter',
  NEXT_QUESTION: 'ArrowRight',
  PREV_QUESTION: 'ArrowLeft',
  MARK_REVIEW: 'r',
  CLEAR_ANSWER: 'c',
  OPTION_A: '1',
  OPTION_B: '2',
  OPTION_C: '3',
  OPTION_D: '4',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: `File size exceeds ${APP_CONFIG.maxFileSize / (1024 * 1024)}MB limit`,
  INVALID_FILE_TYPE: `Please upload a valid file: ${APP_CONFIG.supportedFileTypes.join(', ')}`,
  INSUFFICIENT_DATA: `Sheet needs at least ${APP_CONFIG.minWordsRequired} words`,
  PROCESSING_FAILED: 'Failed to process the file. Please check the format and try again.',
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  FILE_PROCESSED: 'File processed successfully!',
  TEST_SUBMITTED: 'Test submitted successfully!',
  DATA_SAVED: 'Data saved successfully!',
} as const;

export const STORAGE_KEYS = {
  APP_STATE: 'ssc-cgl-app-state',
  USER_PREFERENCES: 'ssc-cgl-user-preferences',
  TEST_HISTORY: 'ssc-cgl-test-history',
} as const;