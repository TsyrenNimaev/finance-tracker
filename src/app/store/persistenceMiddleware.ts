import { createListenerMiddleware } from '@reduxjs/toolkit';
import { syncStoreWithDB } from '@/shared/api/db-operations';
import type { RootState } from './rootReducers';

export const persistenceMiddleware = createListenerMiddleware();

persistenceMiddleware.startListening({
  predicate: (action) => {
    return (
      action.type?.startsWith('transactions/') ||
      action.type?.startsWith('categories/')
    );
  },
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;

    try {
      await syncStoreWithDB(state.transactions.items, state.categories.items);
      console.log('Synced with IndexDB');
    } catch (error) {
      console.error('Failed to sync with IndexDB:', error);
    }
  },
});
