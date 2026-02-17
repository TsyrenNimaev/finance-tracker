import { useState } from 'react';
import { useReport } from '../model/hooks';
import { ReportResult } from './ReportResult';
import { CategorySelected } from './CategorySelected';
import { datePresets, getDateRange } from '../lib/datePresets';
import type { ReportFilters } from '../model/types';
import styles from './Reports.module.scss';
import { useAppSelector } from '@/app/store/hooks';

export const Reports = () => {
  const categories = useAppSelector((state) => state.categories.items);
  const [filters, setFilters] = useState<ReportFilters>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const [activePreset, setActivePreset] = useState<string>('thisMonth');
  const [hasSelectedCategory, setHasSelectedCategory] = useState(false);
  const result = useReport(filters);

  const handlePresetClick = (preset: (typeof datePresets)[number]) => {
    const { startDate, endDate } = getDateRange(preset);
    setFilters((prev) => ({ ...prev, startDate, endDate }));
    setActivePreset(preset.label);
  };

  const handleCategorySelect = (
    level2Id: string | undefined,
    level3Id: string | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      categoryLevel2Id: level2Id,
      categoryLevel3Id: level3Id,
    }));

    setHasSelectedCategory(!!level2Id);
  };

  return (
    <div className={styles.reports}>
      <div className={styles.header}>
        <h2>Отчеты и статистика</h2>
        <p>Анализируйте свои доходы и расходы</p>
      </div>

      <div className={styles.presets}>
        {datePresets.map((preset) => (
          <button
            key={preset.label}
            className={`${styles.presetButton} ${activePreset === preset.label ? styles.presetButtonActive : ''}`}
            onClick={() => handlePresetClick(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <CategorySelected onSelect={handleCategorySelect} />

      <div className={styles.resultsSection}>
        <h3 className={styles.resultsTitle}>
          Результаты
          {filters.categoryLevel2Id && (
            <span className={styles.selectedCategoty}>
              {categories.find((c) => c.id === filters.categoryLevel2Id)?.name}
              {filters.categoryLevel3Id &&
                ` → ${categories.find((c) => c.id === filters.categoryLevel3Id)?.name}`}
            </span>
          )}
        </h3>

        {hasSelectedCategory ? (
          <ReportResult result={result} searchTerm={''} />
        ) : (
          <div className={styles.noCategorySelected}>
            <p>Выберите категорию для простомотра отчета</p>
            <span className={styles.hint}>
              Можно выбрать группу или конкретную статью
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
