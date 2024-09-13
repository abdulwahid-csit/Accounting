import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingRoutes } from './setting.routing';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './General settings/General.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutes,
    FormsModule
  ],
  declarations: [
    SettingComponent,
    GeneralComponent

  ],
  exports: [
    RouterModule
  ]
})
export class SettingModule { }
