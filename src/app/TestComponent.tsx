import { addCaregory } from '../entities/category/model/slice';
import { addTransition } from '../entities/transaction/model/slice';
import { Button } from '../shared/ui/Button';
import { Card } from '../shared/ui/Card';
import { useAppDispatch, useAppSelector } from './store/hooks';

export const TestComponent = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.items);
  const categories = useAppSelector((state) => state.categories.items);

  const handleAddTransaction = () => {
    const newTransaction = {
      id: Date.now().toString(),
      amount: 100,
      description: 'Тестовая транзакция',
      date: new Date().toISOString(),
      type: 'expense' as const,
      categoryId: 'cat-3-1',
      createdAt: new Date().toISOString(),
    };
    dispatch(addTransition(newTransaction));
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: 'Новая категория',
      parentId: 'products',
      level: 3,
    };
    dispatch(addCaregory(newCategory));
  };

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <Card padding='medium'>
        <h3>Тест Redux</h3>
        <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
          <Button onClick={handleAddTransaction}>Добавить транзакцию</Button>
          <Button onClick={handleAddCategory}>Добавить категорию</Button>
        </div>
        <p>Транзакции: {transactions.length}</p>
        <p>Категории: {categories.length}</p>
        <div style={{ marginTop: '20px' }}>
          <h4>Последняя транзакция</h4>
          {transactions[0] && (
            <p>
              {transactions[0].description}: {transactions[0].amount} ₽
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
