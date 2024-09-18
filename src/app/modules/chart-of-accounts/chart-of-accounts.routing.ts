import { Routes, RouterModule } from '@angular/router';
import { ChartOfAccountsComponent } from './chart-of-accounts.component';
import { ImportAccountComponent } from './import-account/import-account.component';

const routes: Routes = [
  { path: '', component: ChartOfAccountsComponent },
  { path: 'import_account', component: ImportAccountComponent },
];

export const ChartOfAccountsRoutes = RouterModule.forChild(routes);
