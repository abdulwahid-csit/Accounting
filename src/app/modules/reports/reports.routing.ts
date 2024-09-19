import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AccountHistoryComponent } from './AccountHistory/AccountHistory.component';
import { AccountListComponent } from './AccountList/AccountList.component';
import { BalanceSheetComponent } from './BalanceSheet/BalanceSheet.component';
import { CashFlowsComponent } from './CashFlows/CashFlows.component';
import { ChangesInEquityComponent } from './ChangesInEquity/ChangesInEquity.component';
import { GeneralLedgerComponent } from './GeneralLedger/GeneralLedger.component';
import { JournalComponent } from './Journal/Journal.component';
import { ProfitnLossComponent } from './ProfitnLoss/ProfitnLoss.component';

const routes: Routes = [
  {
    path:'', component: ReportsComponent
  },
      {
        path:'accounthistory', component: AccountHistoryComponent
      },
      {
        path: 'accountlist', component: AccountListComponent
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
        path:'generalledger', component: GeneralLedgerComponent
      },
      {
        path:'Journal' ,  component: JournalComponent
      },
      {
        path:'profitnloss' , component: ProfitnLossComponent
      }


];

export const ReportsRoutes = RouterModule.forChild(routes);
