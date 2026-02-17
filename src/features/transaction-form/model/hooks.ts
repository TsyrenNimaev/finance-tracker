import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { DEFAULT_FORM_VALUES } from './constants';
import { addCategory } from '@/entities/category/model/slice';
import { validateTransactionForm } from './validation';
import { addTransition } from '@/entities/transaction/model/slice';
import type { TransactionFormData } from './types';
import type { Category } from '@/entities/category/model/types';
import {
  addCategoryToDB,
  addTransactionToDB,
} from '@/shared/api/db-operations';

// Функция для генерации ID в зависимости от уровня
const generateCategoryId = (
  level: number,
  parentId?: string | null,
): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);

  switch (level) {
    case 1: {
      return `level1-${timestamp}-${random}`;
    }
    case 2: {
      const parentPrefix = parentId === 'income' ? 'inc' : 'exp';
      return `group-${parentPrefix}-${timestamp}`;
    }
    case 3: {
      return `cat-${timestamp}-${random}`;
    }
    default: {
      return `cat-${timestamp}-${random}`;
    }
  }
};

export const useTransactionForm = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

  const [formData, setFormData] =
    useState<TransactionFormData>(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Обновление поля формы
  const updateField = useCallback(
    (field: keyof TransactionFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Очищаем ошибку при изменении поля
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    },
    [errors],
  );

  // Сброс формы
  const resetForm = useCallback(() => {
    setFormData(DEFAULT_FORM_VALUES);
    setErrors({});
  }, []);

  // Добавление новой категории
  const handleCreateCategory = useCallback(
    async (name: string, parentId: string | null, level: number) => {
      if (level === 2 && !parentId) {
        throw new Error('Для создания категории нужен тип операции');
      }

      if (level === 3 && !parentId) {
        throw new Error('Для создания статьи нужна категория');
      }
      const newCategory: Category = {
        id: generateCategoryId(level, parentId),
        name,
        parentId,
        level,
      };
      dispatch(addCategory(newCategory));
      await addCategoryToDB(newCategory);
      return newCategory.id;
    },
    [dispatch],
  );

  // Получение категорий для определенного уровня
  const getCategoryForLevel = useCallback(
    (level: number, parentId?: string | null) => {
      if (parentId === undefined) {
        return categories.filter((cat) => cat.level === level);
      }
      return categories.filter(
        (cat) => cat.level === level && cat.parentId === parentId,
      );
    },
    [categories],
  );

  // Обработка отправки формы
  const handleSubmit = useCallback(async () => {
    const validationErrors = validateTransactionForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsSubmitting(true);

    try {
      const newTransaction = {
        id: Date.now().toString(),
        amount: parseFloat(
          formData.amount.replace(/\s/g, '').replace(',', '.'),
        ),
        description: formData.description,
        date: formData.date,
        type: formData.type,
        categoryId: formData.categoryLevel3,
      };

      dispatch(addTransition(newTransaction));
      await addTransactionToDB(newTransaction);
      resetForm();
    } catch (error) {
      console.error('Transaction submission error', error);
      setErrors({ submit: 'Ошибка при сохранении' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, dispatch, resetForm]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    resetForm,
    handleSubmit,
    handleCreateCategory,
    getCategoryForLevel,
  };
};
