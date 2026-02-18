import Dexie, { type Table } from 'dexie';
import type { Transaction } from '@/entities/transaction/model/types';
import type { Category } from '@/entities/category/model/types';

export class FinanceDB extends Dexie {
  transactions!: Table<Transaction, string>;
  categories!: Table<Category, string>;

  constructor() {
    super('FinanceTrackerDB');

    this.version(1).stores({
      transactions: 'id, date, type, categoryId, amount',
      categories: 'id, parentId, level, name',
    });
  }
}

export const db = new FinanceDB();
