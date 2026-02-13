import type { Transaction } from '@/entities/transaction/model/types';
import { Card } from '@/shared/ui/Card';
import { TransactionItem } from './TransactionItem';
import styles from './DayGroup.module.scss';

interface DayGroupProps {
  date: string;
  transactions: Array<
    Transaction & {
      categoryName: string;
      parentCategoryName: string;
      categoryIcon: string;
    }
  >;
  onDelete?: (id: string) => void;
}

export const DayGroup = ({ date, transactions, onDelete }: DayGroupProps) => {
  const dayTotal = transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);

  const formattedDate = new Date(date).toLocaleDateString('ru-Ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTotal = new Intl.NumberFormat('ru-Ru', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(dayTotal));

  return (
    <Card padding='medium' className={styles.dayGroup}>
      <div className={styles.header}>
        <h3 className={styles.date}>{formattedDate}</h3>
        <span
          className={`${styles.total} ${dayTotal >= 0 ? styles.positive : styles.negative}`}
        >
          {dayTotal >= 0 ? '+' : '-'}
          {formattedTotal} ₽
        </span>
      </div>

      <div className={styles.transaction}>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            {...transaction}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
};
