import { Button } from '../shared/ui/Button';
import { Input } from '../shared/ui/Input';
import './styles/global.scss';

function App() {
  return (
    <div className='app'>
      <h1>Finance Tracker PWA</h1>

      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <Button variant='primary'>Основная</Button>
        <Button variant='secondary'>Вторичная</Button>
        <Button variant='outline'>Контурная</Button>
        <Button isLoading>Загрузка</Button>
      </div>

      <div
        style={{
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Input placeholder='Введите сумму' />
        <Input label='Описание транзакции' placeholder='На что потратили?' />
        <Input label='С ошибкой' error='Поле обязательно для заполнения' />
        <Input label='Широкое поле' fullWidth />
      </div>
    </div>
  );
}

export default App;
