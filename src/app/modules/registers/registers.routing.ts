import { Routes, RouterModule } from '@angular/router';
import { RegistersComponent } from './registers.component';

const routes: Routes = [
  { path: '', component: RegistersComponent },
];

export const RegistersRoutes = RouterModule.forChild(routes);
