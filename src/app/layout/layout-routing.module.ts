import { RegistersModule } from './../modules/registers/registers.module';
import { ChecksModule } from './../modules/checks/checks.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
// import { roleGuardChild } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),

      },
      {
        path: 'banking',
        loadChildren: () => import('../modules/banking/banking.module').then(m => m.BankingModule),

      },
      {
        path: 'transaction',
        loadChildren: () => import('../modules/transactions/transactions.module').then(m => m.TransactionsModule),

      },
      {
        path: 'charts-of-account',
        loadChildren: () => import('../modules/chart-of-accounts/chart-of-accounts.module').then(m => m.ChartOfAccountsModule),

      },
      {
        path: 'reports',
        loadChildren: () => import('../modules/reports/reports.module').then(m => m.ReportsModule),

      },
      {
        path: 'journal',
        loadChildren: () => import('../modules/journal-entry/journal-entry.module').then(m => m.JournalEntryModule),

      },
      {
        path: 'account',
        loadChildren: () => import('../modules/account/account.module').then(m => m.AccountModule),

      },
      {
        path: 'convert',
        loadChildren: () => import('../modules/convert/convert.module').then(m => m.ConvertModule),

      },
      {
        path: 'reconcile',
        loadChildren: () => import('../modules/reconcile/reconcile.module').then(m => m.ReconcileModule),

      },
      {
        path: 'budget',
        loadChildren: () => import('../modules/budget/budget.module').then(m => m.BudgetModule),

      },
      {
        path: 'bills',
        loadChildren: () => import('../modules/bills/bills.module').then(m => m.BillsModule),

      },
      {
        path: 'checks',
        loadChildren: () => import('../modules/checks/checks.module').then(m => m.ChecksModule),

      },
      {
        path: 'setting',
        loadChildren: () => import('../modules/setting/setting.module').then(m => m.SettingModule),

      },
      {
        path: 'register',
        loadChildren: () => import('../modules/registers/registers.module').then(m => m.RegistersModule),

      },
      {
        path: 'organization',
        loadChildren: () => import('../modules/organizations/organizations.module').then(m => m.OrganizationsModule),

      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
