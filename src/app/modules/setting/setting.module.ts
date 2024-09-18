import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingRoutes } from './setting.routing';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './General settings/General.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MappingSetupComponent } from './Mapping-Setup/Mapping-Setup.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutes,
    FormsModule,
    NgSelectModule
  ],
  declarations: [
    SettingComponent,
    GeneralComponent,
    MappingSetupComponent

  ],
  exports: [
    RouterModule
  ]
})
export class SettingModule { }
