import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedView: string = 'bankAccounts';

  showBankAccounts() {
    this.selectedView = 'bankAccounts';
  }

  showBankFeeds() {
    this.selectedView = 'bankFeeds';
  }

}
