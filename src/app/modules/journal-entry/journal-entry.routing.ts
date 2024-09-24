import { Routes, RouterModule } from '@angular/router';
import { JournalEntryComponent } from './journal-entry.component';
import { CreateJournelComponent } from './create-journel-Modal/create-journel.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';

const routes: Routes = [
  { path: '', component: JournalEntryComponent },
  { path: 'new-journel', component: CreateJournelComponent },
  { path: 'journal-voucher', component: JournalVoucherComponent }
];

export const JournalEntryRoutes = RouterModule.forChild(routes);
