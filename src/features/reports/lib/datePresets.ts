type DarePreset =
  | { label: string; days: number }
  | { label: string; custom: 'thisMonth' | 'lastMonth' | 'thisYear' };

export const datePresets: DarePreset[] = [
  { label: 'Сегодня', days: 0 },
  { label: 'Вчера', days: 1 },
  { label: 'Последние 7 дней', days: 7 },
  { label: 'Последние 30 дней', days: 30 },
  { label: 'Этот месяц', custom: 'thisMonth' },
  { label: 'Прошлый месяц', custom: 'lastMonth' },
  { label: 'Этот год', custom: 'thisYear' },
] as const;

export const getDateRange = (preset: (typeof datePresets)[number]) => {
  const today = new Date();
  const endDate = new Date().toISOString().split('T')[0];
  let startDate: string;

  if ('days' in preset) {
    if (preset.days === 0) {
      startDate = endDate;
    } else {
      const date = new Date();
      date.setDate(date.getDate() - preset.days);
      startDate = date.toISOString().split('T')[0];
    }
  } else {
    switch (preset.custom) {
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split('T')[0];
        break;

      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
          .toISOString()
          .split('T')[0];
        break;

      case 'thisYear':
        startDate = new Date(today.getFullYear(), 0, 1)
          .toISOString()
          .split('T')[0];
        break;
      default:
        startDate = endDate;
    }
  }

  return { startDate, endDate };
};
