import { configureStore } from '@reduxjs/toolkit';
import { persistenceMiddleware } from './persistenceMiddleware';
import rootReducer from './rootReducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistenceMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
