import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountHistoryComponent } from './AccountHistory/AccountHistory.component';
import { AccountListComponent } from './AccountList/AccountList.component';
import { BalanceSheetComponent } from './BalanceSheet/BalanceSheet.component';
import { CashFlowsComponent } from './CashFlows/CashFlows.component';
import { ChangesInEquityComponent } from './ChangesInEquity/ChangesInEquity.component';
import { GeneralLedgerComponent } from './GeneralLedger/GeneralLedger.component';
import { JournalComponent } from './Journal/Journal.component';
import { ProfitnLossComponent } from './ProfitnLoss/ProfitnLoss.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutes,
    FormsModule,
    NgSelectModule,
    SharedModule

  ],
  declarations: [ReportsComponent,
    AccountHistoryComponent,
    AccountListComponent,
    BalanceSheetComponent,
    CashFlowsComponent,
    ChangesInEquityComponent,
    GeneralLedgerComponent,
    JournalComponent,
    ProfitnLossComponent

  ],
  exports: [
    RouterModule
  ]
})
export class ReportsModule { }
