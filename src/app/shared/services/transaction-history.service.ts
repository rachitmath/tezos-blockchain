import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TransactionHistory } from '../models/transaction-history';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  private apiUrl: string;
  private coinLayerAPI = 'http://api.coinlayer.com/api/live';
  private xtxPrice: number;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = environment.baseUrl;
    this.getXTZPrice();
  }

  // Get Latest Price for XTZ
  public get xtzUSDValue(): any {
    return this.xtxPrice;
  }

  /***
   * getXTZPrice is used to fetch Real-time value of xtz using coin layer api
  ***/
  // tslint:disable-next-line: typedef
  getXTZPrice() {
    let params = new HttpParams();
    params = params.append('access_key', '9717412b91c3ed05fb9183caaed88f5e');
    params = params.append('symbols', 'XTZ');

    return this.http.get<[any[]]>(this.coinLayerAPI, { params }).subscribe((data: any) => {
      this.xtxPrice = data.rates.XTZ;
    });
  }

  /***
   * getTransactions will fetch all transaction with limit of 10
  ***/
  // tslint:disable-next-line: typedef
  getTransactions() {
    let params = new HttpParams();
    params = params.append('columns', 'row_id,time,type,sender,volume');
    params = params.append('receiver', 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo');
    params = params.append('type', 'transaction');
    params = params.append('limit', '10');

    return this.http.get<[any[]]>(this.apiUrl, { params })
      .pipe(map((array) => array.map((item) => this.mapTransaction(item))));
  }

  /***
   * getTransactionByCursor will fetch transaction by cursor id
  ***/
  // tslint:disable-next-line: typedef
  getTransactionByCursor(cursor) {
    let params = new HttpParams();
    params = params.append('columns', 'row_id,time,type,sender,volume');
    params = params.append('receiver', 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo');
    params = params.append('type', 'transaction');
    params = params.append('limit', '10');
    params = params.append('cursor.lte', cursor);

    return this.http.get<[any[]]>(this.apiUrl, { params })
      .pipe(map((array) => array.map((rawTransaction) => this.mapTransaction(rawTransaction))));
  }

  /***
   * mapTransaction will map the rawTransaction by TransactionHistory Interface
  ***/
  mapTransaction(rawTransaction: any): TransactionHistory {
    return {
      row_id: rawTransaction[0],
      date: rawTransaction[1],
      type: rawTransaction[2],
      senderAddress: rawTransaction[3],
      amount: rawTransaction[4],
    } as unknown as TransactionHistory;
  }

}
