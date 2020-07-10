import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { TransactionHistoryService } from '../../services/transaction-history.service';
import { GetTransactions, TransactionSuccess, LoadMoreTransactions } from '../actions/transaction.actions';


@Injectable()
export class TransactionEffects {

    constructor(private actions$: Actions, private transactionsService: TransactionHistoryService) { }

    loadTransactions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GetTransactions),
            mergeMap(() =>
                this.transactionsService.getTransactions().pipe(
                    map((transactions) => ({ type: TransactionSuccess.type, payload: { transactions } })),
                    catchError(() => EMPTY),
                ),
            ),
        );
    });

    loadMoreTransactions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoadMoreTransactions),
            mergeMap((action) =>
                this.transactionsService.getTransactionByCursor(action.payload.cursorId).pipe(
                    map((transactions) => ({ type: TransactionSuccess.type, payload: { transactions } })),
                    catchError(() => EMPTY),
                ),
            ),
        );
    });

}
