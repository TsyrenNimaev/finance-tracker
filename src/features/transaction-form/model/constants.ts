import type { TransactionFormData } from './types';

export const TRANSACTION_TYPES = [
  { value: 'income', label: 'Доход' },
  { value: 'expense', label: 'Расход' },
] as const;

export const DEFAULT_FORM_VALUES: TransactionFormData = {
  amount: '',
  description: '',
  type: 'expense',
  categoryLevel1: 'expense',
  categoryLevel2: '',
  categoryLevel3: '',
  date: new Date().toISOString().split('T')[0],
};
