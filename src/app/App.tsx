import { TransactionForm } from '@/features/transaction-form';
import { TransactionList } from '@/features/transactions-list/ui/TransactionList';
import { OfflineStatus } from '@/shared/ui/OfflineStatus/OfflineStatus';
import { UpdatePrompt } from '@/shared/ui/UpdatePrompt/UpdatePrompt';
import { TotalBalance } from '@/widgets/total-balance/TotalBalance';
import { StoreProvider, ThemeProvider } from './providers';
import { Reports } from '@/features/reports/ui/Reports';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/global.scss';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';

function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <OfflineStatus />
        <UpdatePrompt />
        <div className='app'>
          <header className='header'>
            <h1>Finance Tracker PWA</h1>
            <ThemeToggle />
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

          <div className='reports-section'>
            <Reports />
          </div>
        </div>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
