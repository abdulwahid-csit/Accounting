import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DataTableComponent,
    PaginationComponent,
    DeleteModalComponent,
    NotFoundComponent,
    ReportListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule,
    ToastrModule.forRoot()

  ],
  exports:[
    DataTableComponent,
    NotFoundComponent,
    ReportListComponent
  ]
})
export class SharedModule { }
