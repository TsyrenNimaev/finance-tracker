import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Button } from '../Button';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      onClick={toggleTheme}
      variant='secondary'
      size='small'
      className={styles.toggle}
      aria-label={
        theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'
      }
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};
