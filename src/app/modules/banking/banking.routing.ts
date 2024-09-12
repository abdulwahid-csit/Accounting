import { Routes, RouterModule } from '@angular/router';
import { BankingComponent } from './banking.component';

const routes: Routes = [
  { path: '', component: BankingComponent },
];

export const BankingRoutes = RouterModule.forChild(routes);
