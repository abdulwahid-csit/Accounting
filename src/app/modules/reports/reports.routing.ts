import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { BalanceSheetComponent } from './BalanceSheet/BalanceSheet.component';
import { CashFlowsComponent } from './Statement of CashFlows/CashFlows.component';
import { ChangesInEquityComponent } from './ChangesInEquity/ChangesInEquity.component';
import { GeneralLedgerComponent } from './General Leisure/GeneralLedger.component';
import { ProfitnLossComponent } from './ProfitnLoss/ProfitnLoss.component';
import { CustomerSummaryComponent } from './CustomerSummary/CustomerSummary.component';
import { TreatBalanceComponent } from './TreatBalance/TreatBalance.component';
import { ReconcilationDetailComponent } from './ReconcilationDetail/ReconcilationDetail.component';
import { BudgetComponent } from '../budget/budget.component';
import { BudgetOveriewComponent } from './BudgetOveriew/BudgetOveriew.component';
import { TaxDetailsComponent } from './TaxDetails/TaxDetails.component';
import { TaxSummaryComponent } from './Tax-Summary/Tax-Summary.component';
import { CheckDetailComponent } from './CheckDetail/CheckDetail.component';

const routes: Routes = [
  {
    path:'', component: ReportsComponent
  },

      {
        path:'balancesheet', component: BalanceSheetComponent
      },
      {
        path:'cashflows', component: CashFlowsComponent
      },
      {
        path:'changesinequity', component: ChangesInEquityComponent
      },
      {
        path:'generalleisure', component: GeneralLedgerComponent
      },

      {
        path:'profitnloss' , component: ProfitnLossComponent
      },
      {
        path:'customerSummary' , component: CustomerSummaryComponent
      },
      {
        path:'TreatBalance' , component: TreatBalanceComponent
      },
      {
        path:'Reconcilation' , component: ReconcilationDetailComponent
      },
      {
        path:'BudegtOverview' , component: BudgetOveriewComponent
      },
      {
        path:'taxdetails' , component: TaxDetailsComponent
      },
      {
        path:'taxSummary' , component: TaxSummaryComponent
      },
      {
        path:'CheckDetail' , component: CheckDetailComponent
      },

];

export const ReportsRoutes = RouterModule.forChild(routes);
