import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BankingRoutes } from './banking.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BankAccountsComponent } from './Bank-accounts/Bank-accounts.component';
import { BankingFeedComponent } from './banking-feed/banking-feed.component';
import { BankingComponent } from './banking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddBankComponent } from './Add-Bank Modal/Add-Bank.component';

@NgModule({
  imports: [
    CommonModule,
    BankingRoutes,
    SharedModule,
    ReactiveFormsModule,
    // QuillModule.forRoot(),
    FormsModule

  ],
  declarations: [
    BankingComponent,
    BankAccountsComponent,
    BankingFeedComponent,
    AddBankComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BankingModule { }
