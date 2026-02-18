import { Card } from '@/shared/ui/Card';
import type { ReportResult as ReportResultType } from '../model/types';
import styles from './ReportResult.module.scss';

interface ReportResultProps {
  result: ReportResultType;
  searchTerm?: string;
  period?: string;
}

export const ReportResult = ({
  result,
  searchTerm,
  period,
}: ReportResultProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
    }).format(Math.abs(value));
  };

  const isPositive = result.totalAmount >= 0;

  if (!result.transactions.length) {
    return (
      <Card padding='large' className={styles.empty}>
        <p>Нет транзакций за выбранный период</p>
      </Card>
    );
  }

  return (
    <Card padding='large' className={styles.result}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {searchTerm ? `Результаты по "${searchTerm}"` : 'Результаты поиска'}
        </h3>
        {period && <span className={styles.period}>{period}</span>}
        <div
          className={`${styles.total} ${isPositive ? styles.positive : styles.negative}`}
        >
          {isPositive ? '+' : '-'}
          {formatCurrency(result.totalAmount)}
        </div>
      </div>

      <div className={styles.transactions}>
        {result.transactions.map((t) => (
          <div key={t.id} className={styles.transaction}>
            <div className={styles.transactionMain}>
              <span className={styles.categoryPath}>{t.categoryPath}</span>
              <span className={styles.amount}>
                {t.amount > 0 ? '+' : '-'}
                {formatCurrency(t.amount)}
              </span>
            </div>
            <div className={styles.transactionDetails}>
              <span className={styles.date}>
                {new Date(t.date).toLocaleDateString('ru-RU')}
              </span>
              {t.description && (
                <span className={styles.description}>{t.description}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
