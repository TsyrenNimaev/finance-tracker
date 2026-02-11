// import { Button } from '../shared/ui/Button';
// import { Card } from '../shared/ui/Card';
// import { Input } from '../shared/ui/Input';
// import { ThemeToggle } from '../shared/ui/ThemeToggle';
import { TransactionForm } from '../features/transaction-form';
import { StoreProvider } from './providers';
import './styles/global.scss';
import { TestComponent } from './TestComponent';

function App() {
  return (
    <StoreProvider>
      <div className='app'>
        <h1>Finance Tracker PWA</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
          }}
        >
          <div>
            <TransactionForm />
          </div>
          <div>
            <TestComponent />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
