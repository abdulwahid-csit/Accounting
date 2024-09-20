/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddBankComponent } from './add-bank.component';

describe('AddBankComponent', () => {
  let component: AddBankComponent;
  let fixture: ComponentFixture<AddBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
