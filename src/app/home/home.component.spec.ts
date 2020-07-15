import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { StoreModule, Store } from '@ngrx/store';
import { transactionsReducer } from '../shared/store/reducers/transaction.reducer';
import { TransactionEffects } from '../shared/store/effects/transaction.effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('transactions', transactionsReducer),
        EffectsModule.forFeature([TransactionEffects]),
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have table HTML element', () => {
    const table = fixture.debugElement.query(By.css('.table')).nativeElement;
    expect(table.innerHTML).not.toBeNull();
    // console.log(board.innerHTML)
    expect(table.innerHTML.length).toBeGreaterThan(0);
  });

  it('should have material virtual scroll', () => {
    const vScroll = fixture.debugElement.query(
      By.css('cdk-virtual-scroll-viewport')
    );
    expect(vScroll).toBeTruthy();
  });

  it(`should have table headers 'Type', 'Amount XTZ (USD)', 'Date', 'Address'`, () => {
    expect(component.tableHeader).toEqual([
      'Type',
      'Amount XTZ (USD)',
      'Date',
      'Address',
    ]);
  });
});
