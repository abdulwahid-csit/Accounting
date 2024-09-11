import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-account-list',
  templateUrl: './bank-account-list.component.html',
  styleUrls: ['./bank-account-list.component.scss']
})
export class BankAccountListComponent implements OnInit {

  bankAccounts = [
    { name: 'BIM', balance: 'R$86,000' },
    { name: 'FNB', balance: 'R$365,100' },
    { name: 'ICICI', balance: 'R$1,055,227' },
    { name: 'Test Account', balance: 'R$5,120' },
    { name: 'Cash and cash equivalents', balance: 'R$1,143,442.12' },
    { name: 'BIM', balance: 'R$86,000' },
    { name: 'FNB', balance: 'R$365,100' },
    { name: 'ICICI', balance: 'R$1,055,227' },
    { name: 'Test Account', balance: 'R$5,120' },
    { name: 'Cash and cash equivalents', balance: 'R$1,143,442.12' },
    { name: 'Credit Card', balance: 'R$0' },
    { name: 'wassay bhai', balance: 'R$100' },
    { name: 'Cash and cash equivalents', balance: 'R$1,143,442.12' },
    { name: 'BIM', balance: 'R$86,000' },
    { name: 'FNB', balance: 'R$365,100' },
    { name: 'ICICI', balance: 'R$1,055,227' },
    { name: 'Test Account', balance: 'R$5,120' },
    { name: 'Cash and cash equivalents', balance: 'R$1,143,442.12' },
    { name: 'Credit Card', balance: 'R$0' },
    { name: 'wassay bhai', balance: 'R$100' },

  ];

  constructor() { }

  ngOnInit() {
  }

}
