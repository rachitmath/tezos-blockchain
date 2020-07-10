import { Action, createAction, props } from '@ngrx/store';
import { TransactionHistory } from '../../models/transaction-history';

export enum TransactionActionTypes {
  GetTransactions = '[Transaction] Get Transactions',
  TransactionSuccess = '[Transaction] Transaction Success',
  LoadMoreTransactions = '[Transaction] Load More'
}

/***
  * Create Action for Get Transaction
 ***/
export const GetTransactions = createAction(TransactionActionTypes.GetTransactions);

/***
  * Create Action Successfully loading transaction
 ***/
export const TransactionSuccess = createAction(TransactionActionTypes.TransactionSuccess,
  props<{ payload: { transactions: TransactionHistory[] } }>(),
);

/***
  * Create Action for Load More Transaction by Cursor id
 ***/
export const LoadMoreTransactions = createAction(
  TransactionActionTypes.LoadMoreTransactions,
  props<{ payload: { cursorId: number } }>(),
);



