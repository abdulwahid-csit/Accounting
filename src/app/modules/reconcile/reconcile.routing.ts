import { Routes, RouterModule } from '@angular/router';
import { ReconcileComponent } from './reconcile.component';

const routes: Routes = [
  { path: '', component: ReconcileComponent },
];

export const ReconcileRoutes = RouterModule.forChild(routes);
