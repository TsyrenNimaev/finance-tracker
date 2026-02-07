export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string; //ISO строка
  type: TransactionType;
  categoryId: string; // Ссылка на ID категории 3-го уровня
  createAt: string;
}

export interface TransactionFormData {
  amount: number;
  description: string;
  type: TransactionType;
  caterogyId: string;
  date?: string;
}

export interface TransactionState {
  items: Transaction[];
  isLoading: boolean;
  error: string | null;
}
