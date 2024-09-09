import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutes } from './transactions.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutes
  ],
  declarations: [TransactionsComponent],
  exports: [
    RouterModule
  ]
  
})
export class TransactionsModule { }
