import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOfAccountsComponent } from './chart-of-accounts.component';
import { ChartOfAccountsRoutes } from './chart-of-accounts.routing';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddAccountComponent } from './add-account/add-account.component';

@NgModule({
  imports: [
    CommonModule,
    ChartOfAccountsRoutes,
    NgSelectModule
  ],
  declarations: [ChartOfAccountsComponent, AddAccountComponent],
  exports: [
    RouterModule
  ]
})
export class ChartOfAccountsModule { }
