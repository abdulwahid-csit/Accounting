import { Routes, RouterModule } from '@angular/router';
import { BillsComponent } from './bills.component';

const routes: Routes = [
  { path: '', component: BillsComponent },
];

export const BillsRoutes = RouterModule.forChild(routes);
