import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingRoutes } from './setting.routing';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './General settings/General.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MappingSetupComponent } from './Mapping-Setup/Mapping-Setup.component';
import { GeneraltabComponent } from './Mapping-Setup/generaltab/generaltab.component';
import { FixedequimentComponent } from './Mapping-Setup/Fixedequiment/Fixedequiment.component';
import { InventoryComponent } from './Mapping-Setup/Inventory/Inventory.component';
import { ManufacturingComponent } from './Mapping-Setup/Manufacturing/Manufacturing.component';
import { OmniComponent } from './Mapping-Setup/Omni/Omni.component';
import { PurchaseComponent } from './Mapping-Setup/Purchase/Purchase.component';
import { PayslipsComponent } from './Mapping-Setup/Payslips/Payslips.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutes,
    FormsModule,
    NgSelectModule,

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
    PayslipsComponent
  ],
  exports: [
    RouterModule
  ]
})
export class SettingModule { }
