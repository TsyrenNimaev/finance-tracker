// import { Button } from '../shared/ui/Button';
// import { Card } from '../shared/ui/Card';
// import { Input } from '../shared/ui/Input';
// import { ThemeToggle } from '../shared/ui/ThemeToggle';
import { TransactionForm } from '../features/transaction-form';
import { TransactionList } from '../features/transactions-list/ui/TransactionList';
import { OfflineStatus } from '../shared/ui/OfflineStatus/OfflineStatus';
import { UpdatePrompt } from '../shared/ui/UpdatePrompt/UpdatePrompt';
import { StoreProvider } from './providers';
import './styles/global.scss';
// import { TestComponent } from './TestComponent';

function App() {
  return (
    <StoreProvider>
      <OfflineStatus />
      <UpdatePrompt />
      <div className='app'>
        <h1>Finance Tracker PWA</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '40px',
          }}
        >
          <TransactionForm />
          <TransactionList />
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
