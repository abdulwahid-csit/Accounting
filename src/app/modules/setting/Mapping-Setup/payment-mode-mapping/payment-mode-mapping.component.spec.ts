import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModeMappingComponent } from './payment-mode-mapping.component';

describe('PaymentModeMappingComponent', () => {
  let component: PaymentModeMappingComponent;
  let fixture: ComponentFixture<PaymentModeMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentModeMappingComponent]
    });
    fixture = TestBed.createComponent(PaymentModeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
