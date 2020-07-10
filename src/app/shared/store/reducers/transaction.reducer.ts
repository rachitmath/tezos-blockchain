import { Action, createReducer, on, createFeatureSelector } from '@ngrx/store';
import { TransactionStore } from '../../models/transaction-store';
import { TransactionHistory } from '../../models/transaction-history';
import { GetTransactions, TransactionSuccess, LoadMoreTransactions } from '../actions/transaction.actions';

export const initialState: TransactionStore = {
  transactions: [] as TransactionHistory[],
};

export const transactionState = createFeatureSelector<TransactionStore>('transactions');

const reducer = createReducer(
  initialState,
  on(GetTransactions),
  on(TransactionSuccess, (state, { payload }) => ({
    ...state, transactions: [...state.transactions, ...payload.transactions],
  })),
  on(LoadMoreTransactions),
);

export function transactionsReducer(state: TransactionStore, action: Action): TransactionStore {
  return reducer(state, action);
}


