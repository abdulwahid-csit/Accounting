import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutes } from './transactions.routing';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutes
  ],
  declarations: [ListComponent],
  exports: [
    RouterModule
  ]
  
})
export class TransactionsModule { }
