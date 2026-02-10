export interface Category {
  id: string;
  name: string;
  parentId: string | null; // null для корневых категорий (income/expence)
  level: number; // 1: income/expense, 2: группы, 3: конкретные
}

// Для работы с деревом
export interface CategoryTreeNode extends Category {
  children?: CategoryTreeNode[];
}

export interface CategoriesState {
  items: Category[];
  isLoading: boolean;
  error: string | null;
}
