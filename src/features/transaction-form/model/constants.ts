import type { TransactionType } from '@/entities/transaction/model/types';

export const TRANSACTION_TYPES = [
  {
    value: 'income' as TransactionType,
    label: 'Доход',
    categoryId: 'type_income',
  },
  {
    value: 'expense' as TransactionType,
    label: 'Расход',
    categoryId: 'type_expense',
  },
] as const;

export const DEFAULT_FORM_VALUES = {
  amount: '',
  description: '',
  type: 'expense' as TransactionType,
  categoryLevel1: 'type_expense',
  categoryLevel2: '',
  categoryLevel3: '',
  date: new Date().toISOString().split('T')[0],
};
