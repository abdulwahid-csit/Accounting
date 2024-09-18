/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OmniComponent } from './Omni.component';

describe('OmniComponent', () => {
  let component: OmniComponent;
  let fixture: ComponentFixture<OmniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
