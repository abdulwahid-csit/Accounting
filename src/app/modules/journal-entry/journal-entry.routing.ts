import { Routes, RouterModule } from '@angular/router';
import { JournalEntryComponent } from './journal-entry.component';
import { CreateJournelComponent } from './create-journel/create-journel.component';

const routes: Routes = [
  { path: '', component: JournalEntryComponent },
  {path:'newjournel', component:CreateJournelComponent}
];

export const JournalEntryRoutes = RouterModule.forChild(routes);
