import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import type { TransactionFormData } from './types';
import { DEFAULT_FORM_VALUES } from './constants';
import type { Category } from '../../../entities/category/model/types';
import { addCarygory } from '../../../entities/category/model/slice';
import { validateTransactionForm } from './validation';
import { addTransition } from '../../../entities/transaction/model/slice';

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
    (name: string, parentId: string | null, level: number) => {
      const newCategoty: Category = {
        id: `cat-${Date.now()}`,
        name,
        parentId,
        level,
      };
      dispatch(addCarygory(newCategoty));
      return newCategoty.id;
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
        date: new Date().toISOString(),
        type: formData.type,
        categoryId: formData.catygoryLevel3,
        createdAt: new Date().toISOString(),
      };

      dispatch(addTransition(newTransaction));
    } catch (error) {
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
