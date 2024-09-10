import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BankingRoutes } from './banking.routing';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    BankingRoutes
  ],
  declarations: [ListComponent],
  exports: [
    RouterModule
  ]
})
export class BankingModule { }
