// import { Button } from '../shared/ui/Button';
// import { Card } from '../shared/ui/Card';
// import { Input } from '../shared/ui/Input';
// import { ThemeToggle } from '../shared/ui/ThemeToggle';
import { StoreProvider } from './providers';
import './styles/global.scss';
import { TestComponent } from './TestComponent';

function App() {
  return (
    <StoreProvider>
      <div className='app'>
        <h1>Finance Tracker PWA</h1>
        <TestComponent />
      </div>
    </StoreProvider>
  );
}

export default App;
