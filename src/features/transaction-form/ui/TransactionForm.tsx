import { useCallback, useMemo, type SyntheticEvent } from 'react';
import { ru } from 'date-fns/locale';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { useTransactionForm } from '../model/hooks';
import { AmountInput } from './AmountInput';
import { CategoryCascadeSelect } from './CategoryCascadeSelect';
import { DatePickerInput } from './DatePickerInput';
import DatePicker from 'react-datepicker';
import styles from './TransactionForm.module.scss';

export const TransactionForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    handleCreateCategory,
    getCategoryForLevel,
  } = useTransactionForm();

  const level2Options = useMemo(() => {
    const categories = getCategoryForLevel(2, formData.categoryLevel1);
    return categories.map((cat) => ({ id: cat.id, name: cat.name }));
  }, [getCategoryForLevel, formData.categoryLevel1]);
  const level3Options = useMemo(() => {
    const categories = getCategoryForLevel(3, formData.categoryLevel2);
    return categories.map((cat) => ({ id: cat.id, name: cat.name }));
  }, [getCategoryForLevel, formData.categoryLevel2]);

  const handleLevel2Change = useCallback(
    (value: string) => {
      updateField('categoryLevel2', value);
    },
    [updateField],
  );
  const handleLevel3Change = useCallback(
    (value: string) => {
      updateField('categoryLevel3', value);
    },
    [updateField],
  );

  const handleCreateLevel2Category = useCallback(
    async (name: string) => {
      return await handleCreateCategory(name, formData.categoryLevel1, 2);
    },
    [handleCreateCategory, formData.categoryLevel1],
  );

  const handleCreateLevel3Category = useCallback(
    async (name: string) => {
      return await handleCreateCategory(name, formData.categoryLevel2, 3);
    },
    [handleCreateCategory, formData.categoryLevel2],
  );

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      updateField('date', `${year}-${month}-${day}`);
    } else {
      updateField('date', '');
    }
  };

  const isIncomeActive = formData.categoryLevel1 === 'type_income';
  const isExpenseActive = formData.categoryLevel1 === 'type_expense';

  return (
    <Card padding='large' className={styles.formCard}>
      <h2 className={styles.title}>Добавить транзакцию</h2>

      <form onSubmit={handleFormSubmit}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Тип операции</label>
          <div className={styles.typeButtons}>
            <Button
              type='button'
              variant={isIncomeActive ? 'primary' : 'secondary'}
              onClick={() => {
                updateField('type', 'income');
                updateField('categoryLevel1', 'type_income');
              }}
              className={styles.typeButton}
            >
              Доход
            </Button>
            <Button
              type='button'
              variant={isExpenseActive ? 'primary' : 'secondary'}
              onClick={() => {
                updateField('type', 'expense');
                updateField('categoryLevel1', 'type_expense');
              }}
              className={styles.typeButton}
            >
              Расход
            </Button>
          </div>
        </div>

        <AmountInput
          value={formData.amount}
          onChange={(value) => updateField('amount', value)}
          error={errors.amount}
        />

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Описание</label>
          <input
            type='text'
            className={styles.textInput}
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder='На что потратили или откуда доход?'
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <DatePicker
            selected={
              formData.date ? new Date(formData.date + 'T12:00:00') : null
            }
            onChange={handleDateChange}
            locale={ru}
            dateFormat='dd.MM.yyyy'
            customInput={<DatePickerInput />}
            popperClassName={styles.datePickerPopper}
            placeholderText='Выберите дату'
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Категории</label>
          {formData.categoryLevel1 && (
            <CategoryCascadeSelect
              value={formData.categoryLevel2}
              onChange={handleLevel2Change}
              parentCategoryId={formData.categoryLevel1}
              level={2}
              options={level2Options}
              placeholder='Выберите группу...'
              allowCreate={true}
              onCreateCategory={handleCreateLevel2Category}
            />
          )}

          {formData.categoryLevel2 && (
            <CategoryCascadeSelect
              value={formData.categoryLevel3}
              onChange={handleLevel3Change}
              parentCategoryId={formData.categoryLevel2}
              level={3}
              options={level3Options}
              placeholder='Выберите статью...'
              allowCreate={true}
              onCreateCategory={handleCreateLevel3Category}
            />
          )}

          {errors.categoryLevel3 && (
            <span className={styles.error}>{errors.categoryLevel3}</span>
          )}
        </div>

        <div className={styles.actions}>
          <Button
            type='submit'
            variant='primary'
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Добавить транзакцию
          </Button>
        </div>
      </form>
    </Card>
  );
};
