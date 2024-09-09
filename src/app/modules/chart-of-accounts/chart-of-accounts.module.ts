import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOfAccountsComponent } from './chart-of-accounts.component';
import { ChartOfAccountsRoutes } from './chart-of-accounts.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ChartOfAccountsRoutes
  ],
  declarations: [ChartOfAccountsComponent],
  exports: [
    RouterModule
  ]
})
export class ChartOfAccountsModule { }
