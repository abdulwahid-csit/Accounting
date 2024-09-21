import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { GeneralComponent } from './General settings/General.component';
import { MappingSetupComponent } from './Mapping-Setup/Mapping-Setup.component';

const routes: Routes = [
  {  path: '', component: SettingComponent },
  {  path:'general-settings', component:GeneralComponent },
  {  path:'mapping-settings', component:MappingSetupComponent}
];

export const SettingRoutes = RouterModule.forChild(routes);
