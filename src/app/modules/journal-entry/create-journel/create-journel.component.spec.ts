import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJournelComponent } from './create-journel.component';

describe('CreateJournelComponent', () => {
  let component: CreateJournelComponent;
  let fixture: ComponentFixture<CreateJournelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateJournelComponent]
    });
    fixture = TestBed.createComponent(CreateJournelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
