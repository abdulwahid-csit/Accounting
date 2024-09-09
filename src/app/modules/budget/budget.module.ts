import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { BudgetRoutes } from './budget.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BudgetRoutes
  ],
  declarations: [BudgetComponent],
  exports: [
    RouterModule
  ]
})
export class BudgetModule { }
