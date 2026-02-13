import { forwardRef } from 'react';
import { Input } from '@/shared/ui/Input';
import styles from './DatePickerInput.module.scss';

interface DatePickerInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: (date: string) => void;
}

export const DatePickerInput = forwardRef<
  HTMLInputElement,
  DatePickerInputProps
>(({ value, onClick }, ref) => {
  const handleClick = () => {
    console.log('Input onClick');
    onClick?.();
  };

  return (
    <Input
      ref={ref}
      value={value}
      onClick={handleClick}
      label='Дата'
      readOnly
      className={styles.dateInput}
    />
  );
});

DatePickerInput.displayName = 'DatePickerInput';
