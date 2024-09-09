import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routing';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutes
  ],
  declarations: [ReportsComponent],
  exports: [
    RouterModule
  ]
})
export class ReportsModule { }
