import { combineReducers } from '@reduxjs/toolkit';
import transactionReducer from '../../entities/transaction/model/slice';
import categoriesReducer from '../../entities/category/model/slice';

const rootReducer = combineReducers({
  trasactions: transactionReducer,
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
