import { useMemo } from 'react';
import { useAppSelector } from '../../../app/store/hooks';

export const useEnrichedTransactions = () => {
  const transactions = useAppSelector((state) => state.trasactions.items);
  const categories = useAppSelector((state) => state.categories.items);

  const enrichedTransactions = useMemo(() => {
    return transactions
      .map((transaction) => {
        const catygory = categories.find(
          (c) => c.id === transaction.categoryId,
        );
        const parentCategory = catygory?.parentId
          ? categories.find((c) => c.id === catygory.parentId)
          : null;

        return {
          ...transaction,
          categoryName: catygory?.name || 'Без категории',
          parentCategoryName: parentCategory?.name || '',
          categoryIcon: getCategoryIcon(catygory?.name || ''),
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, categories]);

  return enrichedTransactions;
};

const getCategoryIcon = (categoryName: string): string => {
  const icons: Record<string, string> = {
    Продукты: '🛒',
    Хлеб: '🍞',
    Молоко: '🥛',
    Огурцы: '🥒',
    'Связь/интернет': '📱',
    Телефон: '📞',
    'Домашний интернет': '🏠',
    Зарплата: '💰',
    'Основная зарплата': '💵',
  };

  return icons[categoryName] || '📌';
};
