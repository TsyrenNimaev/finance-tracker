import type { TransactionFormData } from './types';

export const TRANSACTION_TYPES = [
  { value: 'income', label: 'Доход' },
  { value: 'expense', label: 'Расход' },
] as const;

export const DEFAULT_FORM_VALUES: TransactionFormData = {
  amount: '',
  description: '',
  type: 'expense',
  catygoryLevel1: 'expense',
  catygoryLevel2: '',
  catygoryLevel3: '',
};
