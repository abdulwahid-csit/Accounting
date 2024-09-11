import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalEntryComponent } from './journal-entry.component';
import { JournalEntryRoutes } from './journal-entry.routing';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateJournelComponent } from './create-journel/create-journel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    JournalEntryRoutes,
    NgSelectModule,
    BsDatepickerModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [JournalEntryComponent, CreateJournelComponent],
  exports: [
    RouterModule
  ]
})
export class JournalEntryModule { }
