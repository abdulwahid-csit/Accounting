import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BankingRoutes } from './banking.routing';
import { ListComponent } from './list/list.component';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BankingRoutes,
    SharedModule
  ],
  declarations: [ListComponent],
  exports: [
    RouterModule
  ]
})
export class BankingModule { }
