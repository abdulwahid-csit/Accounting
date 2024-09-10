import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent implements OnInit {
  searchItems = '';
  
  accounts = [
    { id: 1, name: 'BIM', category: 'Bank' },
    { id: 2, name: 'FNB - Bilhetes', category: 'Bank' },
    { id: 3, name: 'ICICI', category: 'Bank' },
    { id: 4, name: 'Test Account', category: 'Bank' },
    { id: 5, name: '233 - Short Leave', category: 'Bank' },
    { id: 6, name: 'بانک', category: 'Bank' },
    { id: 7, name: 'Reconciliation Discrepancies', category: 'Other Expense' },
    { id: 8, name: 'Utilities', category: 'Expenses' },
    { id: 9, name: 'Travel expenses - selling', category: 'Expenses' },
  ];

  filteredAccounts = [...this.accounts]; 

  subAccounts = [
    { id: 1, name: 'Accounts Receivable (A/R)' },
    { id: 2, name: 'Allowance for bad debts' },
    { id: 3, name: 'Assets available for sale' },
    { id: 4, name: 'Employee Cash Advances' },
    { id: 5, name: 'Inventory' },
    { id: 6, name: 'Investments - Other' },
    { id: 7, name: 'Loans To Officers' },
    { id: 8, name: 'Loans To Others' },
    { id: 9, name: 'Loans To Shareholders' },
  ];

  selectedAccounts: number[] = [];
  selectedSubAccounts: number[] = [];

  ngOnInit() {
  }

 
  selectAllAccounts() {
    this.selectedAccounts = this.accounts.map(account => account.id);
  }

  deselectAllAccounts() {
    this.selectedAccounts = [];
  }

  
  selectAllSubAccounts() {
    this.selectedSubAccounts = this.subAccounts.map(subaccount => subaccount.id);
  }

  deselectAllSubAccounts() {
    this.selectedSubAccounts = [];
  }

  filterAccounts() {
    const query = this.searchItems.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.name.toLowerCase().includes(query)
    );
  }
}
