import { ChecksComponent } from './checks.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ChecksComponent },
];

export const ChecksRoutes = RouterModule.forChild(routes);
