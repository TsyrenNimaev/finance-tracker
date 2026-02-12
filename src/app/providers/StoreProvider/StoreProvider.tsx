import { Provider } from 'react-redux';
import { useEffect, type ReactNode } from 'react';
import { store } from '../../../app/store';
import {
  loadCategoriesFromDB,
  loadTransactionsFromDB,
} from '../../../shared/api/db-operations';
import { setTransactions } from '../../../entities/transaction/model/slice';
import { setCategories } from '../../../entities/category/model/slice';

interface StorePoviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StorePoviderProps) => {
  useEffect(() => {
    const loadInitialDate = async () => {
      try {
        const [transactions, categories] = await Promise.all([
          loadTransactionsFromDB(),
          loadCategoriesFromDB(),
        ]);

        if (transactions.length > 0) {
          store.dispatch(setTransactions(transactions));
        }

        if (categories.length > 0) {
          store.dispatch(setCategories(categories));
        }

        console.log('Data loaded from IndexDB');
      } catch (error) {
        console.error('Failed to load data from IndexDB:', error);
      }
    };

    loadInitialDate();
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
