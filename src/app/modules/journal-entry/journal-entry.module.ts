import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalEntryComponent } from './journal-entry.component';
import { JournalEntryRoutes } from './journal-entry.routing';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateJournelComponent } from './create-journel-Modal/create-journel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {QuillModule} from 'ngx-quill'
import { SharedModule } from 'src/app/shared/shared.module';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { VoucherComponent } from './voucher-Modal/voucher.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
    JournalEntryRoutes,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    SharedModule,



  ],
  declarations: [JournalEntryComponent, CreateJournelComponent, JournalVoucherComponent, VoucherComponent],
  exports: [
    RouterModule
  ],
})
export class JournalEntryModule { }
