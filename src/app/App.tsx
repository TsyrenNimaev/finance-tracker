import { Button } from '../shared/ui/Button';
import { Card } from '../shared/ui/Card';
import { Input } from '../shared/ui/Input';
import { ThemeToggle } from '../shared/ui/ThemeToggle';
import './styles/global.scss';

function App() {
  return (
    <div className='app'>
      <h1>Finance Tracker PWA</h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px 0',
        }}
      >
        <ThemeToggle />
        <Button variant='primary'>Основная</Button>
        <Button variant='secondary'>Вторичная</Button>
        <Button variant='outline'>Контурная</Button>
        <Button isLoading>Загрузка</Button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginTop: '32px',
        }}
      >
        <Card padding='medium'>
          <h3 style={{ marginBottom: '16px' }}>Форма транзакции</h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Input placeholder='Введите сумму' />
            <Input
              label='Описание транзакции'
              placeholder='На что потратили?'
            />
            <Button variant='primary'>Добавить</Button>
          </div>
        </Card>

        <Card padding='medium' hoverable>
          <h3 style={{ marginBottom: '16px' }}>Последние транзакции</h3>
          <p style={{ color: 'var(--color-text-light)' }}>
            Здесь будет список транзакций
          </p>
          <div
            style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: 'var(--color-secondary)',
              borderRadius: '8px',
            }}
          >
            <p style={{ margin: '0' }}>
              🍞 Хлеб: <strong>50 Р</strong>
            </p>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '14px',
                color: 'var(--color-text-light)',
              }}
            >
              Сегодня, 10:30
            </p>
          </div>
        </Card>

        <Card padding='large'>
          <h3 style={{ marginBottom: '16px' }}>Статистика</h3>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <Button variant='outline'>Добавить доход</Button>
            <Button variant='outline'>Экспорт</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
