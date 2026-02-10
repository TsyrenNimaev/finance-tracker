import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { store } from '../../../app/store';

interface StorePoviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StorePoviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
