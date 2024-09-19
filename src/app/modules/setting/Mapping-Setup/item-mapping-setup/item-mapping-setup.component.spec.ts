import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMappingSetupComponent } from './item-mapping-setup.component';

describe('ItemMappingSetupComponent', () => {
  let component: ItemMappingSetupComponent;
  let fixture: ComponentFixture<ItemMappingSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemMappingSetupComponent]
    });
    fixture = TestBed.createComponent(ItemMappingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
