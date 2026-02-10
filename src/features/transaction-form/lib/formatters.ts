export const formatAmount = (value: string): string => {
  const cleaned = value.replace(/\s/g, '').replace(',', '.');
  const num = parseFloat(cleaned);

  if (isNaN(num)) return value;

  const formatted = new Intl.NumberFormat('ru-Ru', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);

  return formatted.replace(/\s/g, ' ');
};

export const parseAmount = (value: string): number => {
  const cleaned = value.replace(/\s/g, '').replace(',', '');
  return parseFloat(cleaned) || 0;
};
