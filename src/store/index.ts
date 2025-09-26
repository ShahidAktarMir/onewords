import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from './slices/appSlice';
import testReducer from './slices/testSlice';
import uiReducer from './slices/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'], // Only persist app state
};

const persistedAppReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: {
    app: persistedAppReducer,
    test: testReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['app.wordData.trie', 'app.wordData.phoneticMap', 'app.wordData.difficultyScores'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;