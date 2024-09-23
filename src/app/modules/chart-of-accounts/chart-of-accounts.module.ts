import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOfAccountsComponent } from './chart-of-accounts.component';
import { ChartOfAccountsRoutes } from './chart-of-accounts.routing';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddAccountComponent } from './add-account/add-account.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ImportAccountComponent } from './import-account/import-account.component';
import { SharedModule } from "../../shared/shared.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ChartOfAccountsRoutes,
    NgSelectModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BsDatepickerModule,
  
],
  declarations: [ChartOfAccountsComponent, AddAccountComponent, ImportAccountComponent],
  exports: [
    RouterModule
  ]
})
export class ChartOfAccountsModule { }
