import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category, CategoriesState } from './types';
import initialCategories from './initialCategories.json';

const initialState: CategoriesState = {
<<<<<<< HEAD
  items: initialCategories as Category[],
=======
  items: [
    // Уровень1: Типы операций
    { id: 'income', name: 'Доход', parentId: null, level: 1 },
    { id: 'expense', name: 'Расходы', parentId: null, level: 1 },

    // Уровень 2: Группы
    { id: 'products', name: 'Продукты', parentId: 'expense', level: 2 },
    {
      id: 'communication',
      name: 'Связь/интернет',
      parentId: 'expense',
      level: 2,
    },
    { id: 'salary', name: 'Зарплата', parentId: 'income', level: 2 },

    // Уровень 3: Конкретные статьи
    { id: 'cat-3-1', name: 'Хлеб', parentId: 'products', level: 3 },
    { id: 'cat-3-2', name: 'Огурцы', parentId: 'products', level: 3 },
    { id: 'cat-3-3', name: 'Телефон', parentId: 'communication', level: 3 },
    { id: 'cat-3-4', name: 'Основная зарплата', parentId: 'salary', level: 3 },
  ],
>>>>>>> b8e8feacaf84f2cd5f327bdfdfa70d88792f6eaf
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
