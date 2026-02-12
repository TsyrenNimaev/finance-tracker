import { useCallback, useMemo, type SyntheticEvent } from 'react';
import { useTransactionForm } from '../model/hooks';
import styles from './TransactionForm.module.scss';
import { Card } from '../../../shared/ui/Card';
import { TRANSACTION_TYPES } from '../model/constants';
import { Button } from '../../../shared/ui/Button';
import { AmountInput } from './AmountInput';
import { CategoryCascadeSelect } from './CategoryCascadeSelect';

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

  const level2Categories = getCategoryForLevel(2, formData.categoryLevel1);
  const level3Categories = getCategoryForLevel(3, formData.categoryLevel2);

  const level2Options = useMemo(
    () => level2Categories.map((cat) => ({ id: cat.id, name: cat.name })),
    [level2Categories],
  );
  const level3Options = useMemo(
    () => level3Categories.map((cat) => ({ id: cat.id, name: cat.name })),
    [level3Categories],
  );

  const handleLevel2Change = useCallback(
    (value: string) => {
      updateField('categoryLevel2', value);
      updateField('categoryLevel3', '');
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

  return (
    <Card padding='large' className={styles.formCard}>
      <h2 className={styles.title}>Добавить транзакцию</h2>

      <form onSubmit={handleFormSubmit}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>ТИп операции</label>
          <div className={styles.typeButtons}>
            {TRANSACTION_TYPES.map(({ value, label }) => (
              <Button
                key={value}
                type='button'
                variant={formData.type === value ? 'primary' : 'secondary'}
                onClick={() => {
                  updateField('type', value);
                  updateField('categoryLevel1', value);
                  updateField('categoryLevel2', '');
                  updateField('categoryLevel3', '');
                }}
                className={styles.typeButton}
              >
                {label}
              </Button>
            ))}
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
