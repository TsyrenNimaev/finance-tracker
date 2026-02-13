import { TransactionForm } from '@/features/transaction-form';
import { TransactionList } from '@/features/transactions-list/ui/TransactionList';
import { OfflineStatus } from '@/shared/ui/OfflineStatus/OfflineStatus';
import { UpdatePrompt } from '@/shared/ui/UpdatePrompt/UpdatePrompt';
import { TotalBalance } from '@/widgest/total-balance/TotalBalance';
import { StoreProvider } from './providers';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/global.scss';

function App() {
  return (
    <StoreProvider>
      <OfflineStatus />
      <UpdatePrompt />
      <div className='app'>
        <header className='header'>
          <h1>Finance Tracker PWA</h1>
        </header>

        <TotalBalance />
        <div className='content'>
          <div className='form-section'>
            <TransactionForm />
          </div>
          <div className='list-section'>
            <TransactionList />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
