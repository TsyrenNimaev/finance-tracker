import type React from 'react';
import { formatAmount } from '../lib/formatters';
import { Input } from '@/shared/ui/Input';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const AmountInput = ({ value, onChange, error }: AmountInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleaned = rawValue.replace(/[^\d,]/g, '');
    onChange(cleaned);
  };

  const handleBlur = () => {
    if (value) {
      const formated = formatAmount(value);
      onChange(formated);
    }
  };

  return (
    <Input
      label='Сумма'
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      placeholder='0,00'
      inputMode='decimal'
    />
  );
};
