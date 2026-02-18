import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category, CategoriesState } from './types';
import initialCategories from './initialCategories.json';

const initialState: CategoriesState = {
  items: initialCategories as Category[],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addCategory, updateCategory, deleteCategory, setCategories } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
