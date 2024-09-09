import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalEntryComponent } from './journal-entry.component';
import { JournalEntryRoutes } from './journal-entry.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    JournalEntryRoutes
  ],
  declarations: [JournalEntryComponent],
  exports: [
    RouterModule
  ]
})
export class JournalEntryModule { }
