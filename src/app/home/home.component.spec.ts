import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/modules/material/material.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
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
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
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
