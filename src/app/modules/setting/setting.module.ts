import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingRoutes } from './setting.routing';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './General settings/General.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MappingSetupComponent } from './Mapping-Setup/Mapping-Setup.component';
import { GeneraltabComponent } from './Mapping-Setup/generaltab/generaltab.component';
import { FixedequimentComponent } from './Mapping-Setup/Fixedequiment/Fixedequiment.component';
import { InventoryComponent } from './Mapping-Setup/Inventory/Inventory.component';
import { ManufacturingComponent } from './Mapping-Setup/Manufacturing/Manufacturing.component';
import { OmniComponent } from './Mapping-Setup/Omni/Omni.component';
import { PurchaseComponent } from './Mapping-Setup/Purchase/Purchase.component';
import { PayslipsComponent } from './Mapping-Setup/Payslips/Payslips.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ItemMappingSetupComponent } from './Mapping-Setup/item-mapping-setup/item-mapping-setup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentTaxMappingComponent } from './Mapping-Setup/payment-tax-mapping/payment-tax-mapping.component';
import { ExpenseCategoryMappingComponent } from './Mapping-Setup/expense-category-mapping/expense-category-mapping.component';
import { PaymentModeMappingComponent } from './Mapping-Setup/payment-mode-mapping/payment-mode-mapping.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutes,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    SettingComponent,
    GeneralComponent,
    MappingSetupComponent,
    GeneraltabComponent,
    FixedequimentComponent,
    InventoryComponent,
    ManufacturingComponent,
    OmniComponent,
    PurchaseComponent,
    PayslipsComponent,
    ItemMappingSetupComponent,
    PaymentTaxMappingComponent,
    ExpenseCategoryMappingComponent,
    PaymentModeMappingComponent
  ],
  exports: [
    RouterModule
  ]
})
export class SettingModule { }
