import { useAppSelector } from '@/app/store/hooks';
import styles from './CategorySelected.module.scss';
import { useState } from 'react';
import { Card } from '@/shared/ui/Card';

interface CategorySelectedProps {
  onSelect: (
    level2Id: string | undefined,
    level3Id: string | undefined,
  ) => void;
}

export const CategorySelected = ({ onSelect }: CategorySelectedProps) => {
  const categories = useAppSelector((state) => state.categories.items);
  const [selectedLevel2, setSelectedLevel2] = useState<string>('');
  const [selectedLevel3, setSelectedLevel3] = useState<string>('');

  // Получаем все категории уровня 2
  const level2Categories = categories
    .filter((c) => c.level === 2)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Получаем статьи для выбранной группы
  const level3Categories = categories
    .filter((c) => c.level === 3 && c.parentId === selectedLevel2)
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleLevel2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLevel2(value);
    setSelectedLevel3(''); // Сброс статьи пр смене группы

    if (value) {
      onSelect(value, undefined);
    } else {
      onSelect(undefined, undefined);
    }
  };

  const handleLevel3Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLevel3(value);

    if (value) {
      onSelect(selectedLevel2, value);
    }
  };

  const handleClear = () => {
    setSelectedLevel2('');
    setSelectedLevel3('');
    onSelect(undefined, undefined);
  };

  return (
    <Card padding='large' className={styles.selectCard}>
      <h3 className={styles.title}>Выберите категорию</h3>

      <div className={styles.selectGroup}>
        <label className={styles.label}>Категория</label>
        <select
          value={selectedLevel2}
          onChange={handleLevel2Change}
          className={styles.select}
        >
          <option value=''>-- Выберите категорию --</option>
          {level2Categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {selectedLevel2 && level3Categories.length > 0 && (
        <div className={styles.selectGroup}>
          <label className={styles.label}>Статья (необязательно)</label>
          <select
            value={selectedLevel3}
            onChange={handleLevel3Change}
            className={styles.select}
          >
            <option value=''>Все статьи</option>
            {level3Categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <p className={styles.hint}>
            {!selectedLevel3
              ? 'Показаьб все траты по выбранной категории'
              : 'Показать траты по выбранной статье'}
          </p>
        </div>
      )}

      {(selectedLevel2 || selectedLevel3) && (
        <button onClick={handleClear} className={styles.clearButton}>
          ✕ Сбросить выбор
        </button>
      )}
    </Card>
  );
};
