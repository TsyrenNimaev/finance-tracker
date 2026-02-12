import type { Category } from '../../entities/category/model/types';
import type { Transaction } from '../../entities/transaction/model/types';
import { db } from './db';

// Транзакции
export const saveTransactionsToDB = async (transactions: Transaction[]) => {
  await db.transactions.bulkPut(transactions);
};

export const loadTransactionsFromDB = async (): Promise<Transaction[]> => {
  return await db.transactions.toArray();
};

export const addTransactionToDB = async (transaction: Transaction) => {
  await db.transactions.put(transaction);
};

export const deleteTransactionFromDB = async (id: string) => {
  await db.transactions.delete(id);
};

// Категории
export const saveCategoriesToDB = async (categories: Category[]) => {
  await db.categories.bulkPut(categories);
};

export const loadCategoriesFromDB = async (): Promise<Category[]> => {
  return await db.categories.toArray();
};

export const addCategoryToDB = async (category: Category) => {
  await db.categories.put(category);
};

export const deleteCategoryFromDB = async (id: string) => {
  await db.categories.delete(id);
};

// Синхронизация
export const syncStoreWithDB = async (
  transactions: Transaction[],
  categories: Category[],
) => {
  await Promise.all([
    saveTransactionsToDB(transactions),
    saveCategoriesToDB(categories),
  ]);
};
