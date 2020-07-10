import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { transactionsReducer } from '../shared/store/reducers/transaction.reducer';
import { TransactionEffects } from '../shared/store/effects/transaction.effects';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    StoreModule.forFeature('transactions', transactionsReducer),
    EffectsModule.forFeature([TransactionEffects]),
  ]
})
export class HomeModule { }
