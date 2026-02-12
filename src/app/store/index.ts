import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducers';
import { persistenceMiddleware } from './persistenceMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistenceMiddleware.middleware),
  // devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
