import { Routes, RouterModule } from '@angular/router';
import { JournalEntryComponent } from './journal-entry.component';

const routes: Routes = [
  { path: '', component: JournalEntryComponent },
];

export const JournalEntryRoutes = RouterModule.forChild(routes);
