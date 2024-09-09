import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingComponent } from './banking.component';
import { RouterModule } from '@angular/router';
import { BankingRoutes } from './banking.routing';

@NgModule({
  imports: [
    CommonModule,
    BankingRoutes
  ],
  declarations: [BankingComponent],
  exports: [
    RouterModule
  ]
})
export class BankingModule { }
