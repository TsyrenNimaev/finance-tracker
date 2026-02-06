import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  isDark?: boolean;
  onChange?: () => void;
}

export const ThemeToggle = ({ isDark = false, onChange }: ThemeToggleProps) => {
  return (
    <button
      type='button'
      className={styles.toggle}
      onClick={onChange}
      aria-label={
        isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'
      }
    >
      <span className={styles.icon}>{isDark ? '🌙' : '☀️'}</span>
      <span className={styles.text}>{isDark ? 'Темная' : 'Светлая'}</span>
    </button>
  );
};
