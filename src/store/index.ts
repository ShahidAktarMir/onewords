import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/appSlice';
import testReducer from './slices/testSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    test: testReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'app.wordData.trie', 
          'app.wordData.phoneticMap', 
          'app.wordData.difficultyScores',
          'payload.trie',
          'payload.phoneticMap', 
          'payload.difficultyScores'
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;