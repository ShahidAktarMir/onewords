import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, ProcessedWordData } from '@/types';

export interface AppSliceState {
  appState: AppState;
  wordData: ProcessedWordData | null;
  error: string;
  isProcessing: boolean;
  testMode?: 'timed' | 'practice' | 'mock';
}

const initialState: AppSliceState = {
  appState: 'import',
  wordData: null,
  error: '',
  isProcessing: false,
  testMode: undefined,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startProcessing: state => {
      state.isProcessing = true;
      state.error = '';
    },
    
    processingSuccess: (state, action: PayloadAction<ProcessedWordData>) => {
      state.isProcessing = false;
      state.appState = 'selectMode';
      state.wordData = action.payload;
      state.error = '';
    },
    
    processingError: (state, action: PayloadAction<string>) => {
      state.isProcessing = false;
      state.error = action.payload;
    },
    
    setAppState: (state, action: PayloadAction<AppState>) => {
      state.appState = action.payload;
    },

    setTestMode: (state, action: PayloadAction<'timed' | 'practice' | 'mock'>) => {
      state.testMode = action.payload;
    },
    
    clearError: state => {
      state.error = '';
    },
    
    reset: () => initialState,
  },
});

export const {
  startProcessing,
  processingSuccess,
  processingError,
  setAppState,
  setTestMode,
  clearError,
  reset,
} = appSlice.actions;

export default appSlice.reducer;