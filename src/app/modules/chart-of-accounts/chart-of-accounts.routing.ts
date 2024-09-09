import { Routes, RouterModule } from '@angular/router';
import { ChartOfAccountsComponent } from './chart-of-accounts.component';

const routes: Routes = [
  { path: '', component: ChartOfAccountsComponent },
];

export const ChartOfAccountsRoutes = RouterModule.forChild(routes);
