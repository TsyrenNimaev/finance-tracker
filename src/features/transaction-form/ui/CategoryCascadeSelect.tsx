import { useCallback, useEffect, useState } from 'react';
import type { CascadeSelectProps } from '../model/types';
import styles from './CategoryCascadeSelect.module.scss';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';

export const CategoryCascadeSelect = ({
  value,
  onChange,
  parentCategoryId,
  level,
  placeholder = 'Выберите категорию...',
  allowCreate = true,
  onCreateCategory,
}: CascadeSelectProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Если родительская категория изменилась, сьрасываем выбор
  useEffect(() => {
    if (parentCategoryId === undefined) return;
    onChange('', level);
  }, [parentCategoryId, level, onChange]);

  const handleCreateNew = useCallback(() => {
    if (!newCategoryName.trim() || !onCreateCategory) return;

    const newId = onCreateCategory(
      newCategoryName.trim(),
      parentCategoryId || null,
    );
    onChange(newId, level);
    setNewCategoryName('');
    setIsCreating(false);
  }, [newCategoryName, onCreateCategory, parentCategoryId, onChange, level]);

  return (
    <div className={styles.cascadeSelect}>
      {!isCreating ? (
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={value}
            onChange={(e) => onChange(e.target.value, level)}
          >
            <option value=''>{placeholder}</option>
          </select>

          {allowCreate && (
            <Button
              type='button'
              variant='outline'
              size='small'
              onClick={() => setIsCreating(true)}
              className={styles.createButton}
            >
              + Создать
            </Button>
          )}
        </div>
      ) : (
        <div className={styles.createWrapper}>
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder='Введите название категории'
            autoFocus
          />
          <div className={styles.createActions}>
            <Button
              type='button'
              variant='primary'
              size='small'
              onClick={handleCreateNew}
              disabled={!newCategoryName.trim()}
            >
              Добавить
            </Button>
            <Button
              type='button'
              variant='secondary'
              size='small'
              onClick={() => {
                setIsCreating(false);
                setNewCategoryName('');
              }}
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
