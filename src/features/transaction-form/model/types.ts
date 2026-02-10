import type { TransactionType } from '../../../entities/transaction/model/types';

export interface TransactionFormData {
  amount: string;
  description: string;
  type: TransactionType;
  catygoryLevel1: string; // 'income' or 'expense'
  catygoryLevel2: string;
  catygoryLevel3: string;
}

export interface CategoryOption {
  id: string;
  name: string;
  level: number;
  parentId: string | null;
}

export interface CascadeSelectProps {
  value: string;
  onChange: (value: string, level: number) => void;
  parentCategoryId?: string | null;
  level: number;
  placeholder?: string;
  allowCreate?: boolean;
  onCreateCategory?: (name: string, parentId: string | null) => void;
}
