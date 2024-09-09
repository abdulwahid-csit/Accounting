import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingRoutes } from './setting.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutes
  ],
  declarations: [SettingComponent],
  exports: [
    RouterModule
  ]
})
export class SettingModule { }
