import { useMemo } from 'react';
import { useAppSelector } from '@/app/store/hooks';
import type { ReportFilters, ReportResult } from './types';

export const useReport = (filters: ReportFilters): ReportResult => {
  const transactions = useAppSelector((state) => state.transactions.items);
  const categories = useAppSelector((state) => state.categories.items);

  return useMemo(() => {
    // ФИльтрация по дате
    let filtered = transactions.filter((t) => {
      return t.date >= filters.startDate && t.date <= filters.endDate;
    });

    // Получаем все дочерние категории для выбранной группы
    const getChildCategoryIds = (parentId: string): string[] => {
      return categories.filter((c) => c.parentId === parentId).map((c) => c.id);
    };

    const isIncomeCategory = (categoryId: string): boolean => {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) return false;

      let current = category;
      while (current.parentId) {
        const parent = categories.find((c) => c.id === current.parentId);
        if (!parent) break;
        current = parent;
      }

      return current.id === 'type_income' || current.name === 'Доход';
    };

    // Фильтрация по категориям
    if (filters.categoryLevel3Id) {
      // Выьрана конкретная статья
      filtered = filtered.filter(
        (t) => t.categoryId === filters.categoryLevel3Id,
      );
    } else if (filters.categoryLevel2Id) {
      // Выбрана группа - включаем все статьи этой группы
      const childIds = getChildCategoryIds(filters.categoryLevel2Id);
      filtered = filtered.filter((t) => childIds.includes(t.categoryId));
    } else {
      return {
        totalAmount: 0,
        transactions: [],
        byCategory: {},
      };
    }

    // Получение полного пути категории для каждой транзакции
    const getCategoryPath = (categoryId: string): string => {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) return 'Без категории';

      const names: string[] = [category.name];
      let current = category;

      while (current.parentId) {
        const parent = categories.find((c) => c.id === current.parentId);
        if (parent) {
          names.unshift(parent.name);
          current = parent;
        } else {
          break;
        }
      }

      return names.join(' → ');
    };

    // Группировака по категориям
    const byCategory: Record<string, number> = {};
    const enrichedTransactions = filtered.map((t) => {
      const categoryPath = getCategoryPath(t.categoryId);
      const isIncome = isIncomeCategory(t.categoryId);

      const signedAmount = isIncome ? Math.abs(t.amount) : -Math.abs(t.amount);

      byCategory[t.categoryId] = (byCategory[t.categoryId] || 0) + signedAmount;

      return {
        id: t.id,
        amount: signedAmount,
        description: t.description,
        date: t.date,
        categoryName:
          categories.find((c) => c.id === t.categoryId)?.name ||
          'Без категории',
        categoryPath,
      };
    });

    const totalAmount = enrichedTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );

    return {
      totalAmount,
      transactions: enrichedTransactions,
      byCategory,
    };
  }, [transactions, categories, filters]);
};
