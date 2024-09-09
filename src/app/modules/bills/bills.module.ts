import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsComponent } from './bills.component';
import { BillsRoutes } from './bills.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, 
    BillsRoutes
  ],
  declarations: [BillsComponent],
  exports: [
    RouterModule
  ]
})
export class BillsModule { }
