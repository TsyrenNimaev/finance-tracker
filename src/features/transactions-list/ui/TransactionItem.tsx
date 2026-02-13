import styles from './TransactionItem.module.scss';

interface TransactionItemProps {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  categoryName: string;
  parentCategoryName: string;
  categoryIcon: string;
  onDelete?: (id: string) => void;
}

export const TransactionItem = ({
  id,
  amount,
  description,
  type,
  categoryName,
  parentCategoryName,
  categoryIcon,
  onDelete,
}: TransactionItemProps) => {
  const isExpense = type === 'expense';
  const formattedAmount = new Intl.NumberFormat('ru-Ru', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <div className={styles.transaction}>
      <div className={styles.icon}>{categoryIcon}</div>
      <div className={styles.content}>
        <div className={styles.main}>
          <span className={styles.category}>
            {parentCategoryName && `${parentCategoryName} • `}
            <strong>{categoryName}</strong>
          </span>
          <span
            className={`${styles.amount} ${isExpense ? styles.expense : styles.income}`}
          >
            {isExpense ? '-' : '+'}
            {formattedAmount} ₽
          </span>
        </div>

        <div className={styles.details}>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
      </div>

      {onDelete && (
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(id)}
          aria-label='Удалить'
        >
          ×
        </button>
      )}
    </div>
  );
};
