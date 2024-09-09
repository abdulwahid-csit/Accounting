import { Routes, RouterModule } from '@angular/router';
import { ConvertComponent } from './convert.component';

const routes: Routes = [
  { path: '', component: ConvertComponent },
];

export const ConvertRoutes = RouterModule.forChild(routes);
