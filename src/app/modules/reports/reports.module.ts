import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { BalanceSheetComponent } from './BalanceSheet/BalanceSheet.component';
import { CashFlowsComponent } from './Statement of CashFlows/CashFlows.component';
import { ChangesInEquityComponent } from './ChangesInEquity/ChangesInEquity.component';
import { GeneralLedgerComponent } from './General Leisure/GeneralLedger.component';
import { ProfitnLossComponent } from './ProfitnLoss/ProfitnLoss.component';
import { BudgetComponent } from '../budget/budget.component';
import { BudgetOveriewComponent } from './BudgetOveriew/BudgetOveriew.component';
import { CheckDetailComponent } from './CheckDetail/CheckDetail.component';
import { ReconcileComponent } from '../reconcile/reconcile.component';
import { ReconcilationDetailComponent } from './ReconcilationDetail/ReconcilationDetail.component';
import { TaxSummaryComponent } from './Tax-Summary/Tax-Summary.component';
import { TaxDetailsComponent } from './TaxDetails/TaxDetails.component';
import { TreatBalanceComponent } from './TreatBalance/TreatBalance.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutes,
    FormsModule,
    NgSelectModule,
    SharedModule

  ],
  declarations: [
    ReportsComponent,
    BalanceSheetComponent,
    CashFlowsComponent,
    ChangesInEquityComponent,
    GeneralLedgerComponent,
    ProfitnLossComponent,
    BudgetOveriewComponent,
    CheckDetailComponent,
    ReconcilationDetailComponent,
    TaxSummaryComponent,
    TaxDetailsComponent,
    TreatBalanceComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ReportsModule { }
