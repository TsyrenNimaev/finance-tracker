import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction, TransactionState } from './types';

const initialState: TransactionState = {
  items: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransition: (state, action: PayloadAction<Transaction>) => {
      state.items.unshift(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTransition,
  updateTransaction,
  deleteTransaction,
  setTransactions,
  setLoading,
  setError,
} = transactionSlice.actions;

export default transactionSlice.reducer;
