import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
];

export const BankingRoutes = RouterModule.forChild(routes);
