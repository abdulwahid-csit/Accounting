import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budget.component';

const routes: Routes = [
  { path: '', component: BudgetComponent },
];

export const BudgetRoutes = RouterModule.forChild(routes);
