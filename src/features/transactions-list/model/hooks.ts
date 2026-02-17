import { useMemo } from 'react';
import { useAppSelector } from '@/app/store/hooks';

export const useEnrichedTransactions = () => {
  const transactions = useAppSelector((state) => state.transactions.items);
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
    Транспорт: '🚇',
    Автобус: '🚌',
    Такси: '🚕',
    'К чаю': '☕',
    Дивиденды: '📈',
    Инвестиции: '📊',
    Накопления: '🏦',
    Табак: '🚬',
    Сигареты: '🚬',
    Масло: '🫒',
    Мясо: '🥩',
    Говядина: '🐄',
    Свинина: '🐖',
    Курица: '🐔',
    Яйца: '🥚',
    Доставка: '📦',
    Квартира: '🏢',
    Аренда: '🔑',
    'Коммунальные платежи': '💡',
    Бананы: '🍌',
    Парикмахерская: '💇',
    Пельмени: '🥟',
    Обед: '🍱',
    Кофе: '☕',
    Аптека: '💊',
    Лекарства: '💊',
    Спортзал: '🏋️',
    Одежда: '👕',
    Обувь: '👟',
    Развлечения: '🎮',
    Кино: '🎬',
    Кафе: '🍽️',
    Здоровье: '🏥',
    Образование: '📚',
    Подарки: '🎁',
    Путешествия: '✈️',
    Отпуск: '🏖️',
  };

  return icons[categoryName] || '📌';
};
