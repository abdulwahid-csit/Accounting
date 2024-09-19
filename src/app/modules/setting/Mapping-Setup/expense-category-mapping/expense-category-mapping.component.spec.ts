import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryMappingComponent } from './expense-category-mapping.component';

describe('ExpenseCategoryMappingComponent', () => {
  let component: ExpenseCategoryMappingComponent;
  let fixture: ComponentFixture<ExpenseCategoryMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseCategoryMappingComponent]
    });
    fixture = TestBed.createComponent(ExpenseCategoryMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
