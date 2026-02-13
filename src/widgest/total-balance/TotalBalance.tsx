import { useAppSelector } from '@/app/store/hooks';
import { Card } from '@/shared/ui/Card';
import styles from './TotalBalance.module.scss';
import type { Transaction } from '@/entities/transaction/model/types';
import { useMemo } from 'react';

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const calculateTotalByTypa = (
  transactions: Transaction[],
  type: 'income' | 'expense',
): number => {
  return transactions
    .filter((t) => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0);
};

export const TotalBalance = () => {
  const transactions = useAppSelector((state) => state.transactions.items);

  const { total, incomeTotal, expenseTotal } = useMemo(() => {
    const incomeTotal = calculateTotalByTypa(transactions, 'income');
    const expenseTotal = calculateTotalByTypa(transactions, 'expense');
    const total = incomeTotal - expenseTotal;

    return { total, incomeTotal, expenseTotal };
  }, [transactions]);

  const formattedTotal = useMemo(
    () => formatCurrency(Math.abs(total)),
    [total],
  );

  const isPositive = total >= 0;
  const isZero = total === 0;

  return (
    <Card padding='large' className={styles.totalBalance}>
      <span className={styles.label}>Общий баланс</span>
      <div className={styles.amountWrapper}>
        <span
          className={`${styles.amount} ${isPositive ? styles.positive : styles.negative}`}
        >
          {isZero ? '' : isPositive ? '+' : '-'}
          {formattedTotal}
        </span>
      </div>
      {isZero && (
        <div className={styles.details}>
          <span>Доходы: {formatCurrency(incomeTotal)}</span>
          <span>Расходы: {formatCurrency(expenseTotal)}</span>
        </div>
      )}
    </Card>
  );
};
