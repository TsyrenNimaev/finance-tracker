import { useCallback, useEffect, useState } from 'react';
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

<<<<<<< HEAD
// Функция для генерации читаемого ID
const generateCategoryId = (name: string, level: number): string => {
  const timestamp = Date.now();
  // Транслитерация и приведение к нижнему регистру
  const slug = name
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]/gi, '_')
    .replace(/[а-яё]/g, (char) => {
      // Простая транслитерация
      const map: Record<string, string> = {
        а: 'a',
        б: 'b',
        в: 'v',
        г: 'g',
        д: 'd',
        е: 'e',
        ё: 'e',
        ж: 'zh',
        з: 'z',
        и: 'i',
        й: 'y',
        к: 'k',
        л: 'l',
        м: 'm',
        н: 'n',
        о: 'o',
        п: 'p',
        р: 'r',
        с: 's',
        т: 't',
        у: 'u',
        ф: 'f',
        х: 'h',
        ц: 'ts',
        ч: 'ch',
        ш: 'sh',
        щ: 'sch',
        ъ: '',
        ы: 'y',
        ь: '',
        э: 'e',
        ю: 'yu',
        я: 'ya',
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 20);

  const prefix = level === 2 ? 'group' : level === 3 ? 'article' : 'cat';
  return `${prefix}_${slug}_${timestamp}`;
=======
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
>>>>>>> b8e8feacaf84f2cd5f327bdfdfa70d88792f6eaf
};

export const useTransactionForm = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

  const [formData, setFormData] =
    useState<TransactionFormData>(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Синхронизация type и categoryLevel1 при изменении
  useEffect(() => {
    if (formData.categoryLevel1 === 'type_income') {
      setFormData((prev) => ({ ...prev, type: 'income' }));
    } else if (formData.categoryLevel1 === 'type_expense') {
      setFormData((prev) => ({ ...prev, type: 'expense' }));
    }
  }, [formData.categoryLevel1]);

  // Обновление поля формы
  const updateField = useCallback(
    (field: keyof TransactionFormData, value: string) => {
      setFormData((prev) => {
        const newData = { ...prev, [field]: value };

        if (field === 'type') {
          newData.categoryLevel1 =
            value === 'income' ? 'type_income' : 'type_expense';
          newData.categoryLevel2 = '';
          newData.categoryLevel3 = '';
        }

        if (field === 'categoryLevel1') {
          newData.categoryLevel2 = '';
          newData.categoryLevel3 = '';
        }

        if (field === 'categoryLevel2') {
          newData.categoryLevel3 = '';
        }

        return newData;
      });

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
<<<<<<< HEAD
      // Префикс в зависимости от уровня
      // let prefix = '';
      if (level === 2 && !parentId) {
        throw new Error('Для создания группы нужен тип операции');
      }
      if (level === 3 && !parentId) {
        throw new Error('Для создания статьи нужна группа');
      }
      if (!name.trim()) {
        throw new Error('Название не может быть пустым');
      }

      const newCategory: Category = {
        id: generateCategoryId(name, level),
        name: name.trim(),
=======
      if (level === 2 && !parentId) {
        throw new Error('Для создания категории нужен тип операции');
      }

      if (level === 3 && !parentId) {
        throw new Error('Для создания статьи нужна категория');
      }
      const newCategory: Category = {
        id: generateCategoryId(level, parentId),
        name,
>>>>>>> b8e8feacaf84f2cd5f327bdfdfa70d88792f6eaf
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
      if (!parentId) return [];

      return categories
        .filter((cat) => cat.level === level && cat.parentId === parentId)
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    [categories],
  );

  // Получение доступных групп для выбранного типа
  const getAvailableGroups = useCallback(() => {
    return getCategoryForLevel(2, formData.categoryLevel1);
  }, [getCategoryForLevel, formData.categoryLevel1]);

  // Получение доступных статей для выбранной группы
  const getAvailableArticles = useCallback(() => {
    return getCategoryForLevel(3, formData.categoryLevel2);
  }, [getCategoryForLevel, formData.categoryLevel2]);

  // Обработка отправки формы
  const handleSubmit = useCallback(async () => {
    // Проверка выбора статьи
    if (!formData.categoryLevel3) {
      setErrors((prev) => ({
        ...prev,
        categoryLevel3: 'Выберите или создайте статью расхода/дохода',
      }));
      return false;
    }

    const validationErrors = validateTransactionForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsSubmitting(true);

    try {
      const newTransaction = {
        id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
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
    getAvailableGroups,
    getAvailableArticles,
  };
};
