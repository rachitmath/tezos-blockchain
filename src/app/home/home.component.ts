import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { TransactionHistory } from '../shared/models/transaction-history';
import { TransactionStore } from '../shared/models/transaction-store';
import { transactionState } from '../shared/store/reducers/transaction.reducer';
import { GetTransactions, LoadMoreTransactions, TransactionSuccess } from '../shared/store/actions/transaction.actions';
import { environment } from 'src/environments/environment';
import { TransactionHistoryService } from '../shared/services/transaction-history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  public transactions: TransactionHistory[];

  public transactionStore = this.store.select(transactionState).pipe(map((state) => state.transactions));
  public destroy = new Subject();
  public transactionLimit = environment.transactionLimit;

  constructor(
    private store: Store<TransactionStore>,
    private scrollDispatcher: ScrollDispatcher,
    private action: Actions,
    private transactionService: TransactionHistoryService
  ) {
  }

  ngOnInit(): void {
    this.transactionStore.subscribe((transactions) => (this.transactions = [...transactions]));
    this.store.dispatch({ type: GetTransactions.type });
    this.subscribeToActions();
  }

  ngAfterViewInit(): void {
    this.onScrollDown();
  }

  subscribeToActions(): void {
    this.action.pipe(ofType(TransactionSuccess)).subscribe(() => {
      this.virtualScroll.setRenderedRange({
        start: this.virtualScroll.getRenderedRange().end,
        end: this.virtualScroll.getRenderedRange().end + this.transactionLimit,
      });
      if (this.virtualScroll.getRenderedRange().end >= this.transactionLimit * 2) {
        this.virtualScroll.scrollToIndex(this.virtualScroll.getRenderedRange().end - this.transactionLimit);
      }
    });
  }

  onScrollDown(): void {
    this.scrollDispatcher
      .scrolled()
      .pipe(
        filter(() => this.virtualScroll.measureScrollOffset('bottom') === 0),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        console.log(this.transactions);
        const transactionCursorId = this.transactions[this.transactions.length - 1].row_id;
        this.addTransactionsByCursorId(transactionCursorId);
      });
  }

  addTransactionsByCursorId(transactionCursorId): void {
    this.store.dispatch({ type: LoadMoreTransactions.type, payload: { cursorId: transactionCursorId } });
  }

  // tslint:disable-next-line: typedef
  convertXTZToUSD(xtzValue) {
    const xtzUsdRate = this.transactionService.xtzUSDValue;
    return xtzValue * xtzUsdRate;
  }


  // tslint:disable-next-line: typedef
  convertSenderAddress(address: string) {
    const subStr = address.split('tz')[1].substring(0, 5);
    console.log(subStr);
    return `tz...${subStr}`;
  }
}
