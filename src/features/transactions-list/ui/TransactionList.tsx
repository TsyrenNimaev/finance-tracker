import { useAppDispatch } from '../../../app/store/hooks';
import { deleteTransaction } from '../../../entities/transaction/model/slice';
import { Card } from '../../../shared/ui/Card';
import { useEnrichedTransactions } from '../model/hooks';
import { DayGroup } from './DayGroup';
import style from './TransactionList.module.scss';

export const TransactionList = () => {
  const dispatch = useAppDispatch();
  const transactions = useEnrichedTransactions();

  // Группировка транзакций по датам
  const groupedTransactions = transactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.date).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as Record<string, typeof transactions>,
  );

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  if (transactions.length === 0) {
    return (
      <Card padding='large' className={style.empty}>
        <p>Пока нет ни одной транзакции</p>
        <p className={style.hint}>
          Добавте первую транзакцию через форму справа
        </p>
      </Card>
    );
  }

  return (
    <div className={style.list}>
      {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
        <DayGroup
          key={date}
          date={date}
          transactions={dayTransactions}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
