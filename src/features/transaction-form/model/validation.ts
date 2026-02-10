import type { TransactionFormData } from './types';

export const validateTransactionForm = (
  data: TransactionFormData,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Проверка суммы
  const amountNum = parseFloat(
    data.amount.replace(/\s/g, '').replace(',', '.'),
  );
  if (!data.amount.trim()) {
    errors.amount = 'Введите сумму';
  } else if (isNaN(amountNum) || amountNum <= 0) {
    errors.amount = 'Введите корректную сумму';
  }

  // Проверка описания
  if (!data.description.trim()) {
    errors.description = 'Введите описание';
  } else if (data.description.length > 50) {
    errors.description = 'Не более 50 символов';
  }

  // Проверка категории 3-го уровня
  if (!data.categoryLevel3) {
    errors.catygoryLevel3 = 'Выберите категорию';
  }

  return errors;
};
