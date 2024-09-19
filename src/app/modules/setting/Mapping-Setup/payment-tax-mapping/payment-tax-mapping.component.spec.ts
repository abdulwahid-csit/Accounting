import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTaxMappingComponent } from './payment-tax-mapping.component';

describe('PaymentTaxMappingComponent', () => {
  let component: PaymentTaxMappingComponent;
  let fixture: ComponentFixture<PaymentTaxMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentTaxMappingComponent]
    });
    fixture = TestBed.createComponent(PaymentTaxMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
