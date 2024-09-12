import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent implements OnInit {
  SearchItems: string = '';
  selectedAccounts: number[] = [];
  selectedSubAccounts: number[] = [];
  applicationList: any[] = [];

  columns = [
    { name: 'Type', key: 'isChecked', isCheckbox: true },
    { name: 'Type', key: 'Type', },

    { name: 'Sub Type', key: 'Sub Type' },
    { name: 'Account Code', key: 'Account Code' },
    { name: 'Account Name', key: 'Account Name' },
    { name: 'Sub Account', key: 'Sub Account' },
    { name: 'Balance', key: 'Balance' }
  ];

  bsConfig = {
    isAnimated: true
  };

  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective | any;

  constructor() {
   
  }

  ngOnInit() {
    const response = {
      "status_code": 200,
      "message": "Paginated list with data and paginate options.",
      "data": {
        "payload": [
          {
            "id": 1,
            "Type": "Accounts Receivable (A/R)",
            "Sub Type": "Accounts Receivable (A/R)",
            "Account Code": "Expense",
            "Account Name": "Accounts Receivable (A/R)",
            "Sub Account": 1200.50,
            "Balance": 800.75,
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 2,
            "Type": "Non-current liabilities",
            "Sub Type": "Accrued holiday payable",
            "Account Code": "Expensed",
            "Account Name": "Traveled",
            "Sub Account": 1200.50,
            "Balance": 800.75,
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 3,
            "Type": "Accrued liabilities",
            "Sub Type": "PreSales",
            "Account Code": "Expensed",
            "Account Name": "Traveled",
            "Sub Account": 1400.50,
            "Balance": 1800.75,
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 4,
            "Type": "Non-current liabilities",
            "Sub Type": "Accrued non-current liabilities",
            "Account Code": "Expensedive",
            "Account Name": "Travelediner",
            "Sub Account": 2200.50,
            "Balance": 3400.75,
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },

        ],
        "paginate_options": {
          "total_pages": 1,
          "payload_size": 10,
          "has_next": false,
          "current_page": 1,
          "skipped_records": 0,
          "total_records": 10
        }
      },
      "timestamp": "2024-09-10T08:06:46.886Z"
    };

    if (response && response.data && response.data.payload) {
      this.applicationList = response.data.payload;
      this.tableConfig.paginationParams = response.data.paginate_options;
      // this.total_pages = response.data.paginate_options.total_pages;
      // this.payload_size = response.data.paginate_options.payload_size;
      // this.current_page = response.data.paginate_options.current_page;
      // this.has_next = response.data.paginate_options.has_next;
      // this.skipped_records = response.data.paginate_options.skipped_records;
      // this.total_records = response.data.paginate_options.total_records;
    }
  }

  openDatepicker() {
    this.datepicker?.show();
  }

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
    { id: 1, name: 'Accounts Receivable (A/R)', },
    { id: 2, name: 'Allowance for bad debts', },
    { id: 3, name: 'Assets available for sale', },
    { id: 4, name: 'Employee Cash Advances', },
    { id: 5, name: 'Inventory', },
    { id: 6, name: 'Investments - Other', },
    { id: 7, name: 'Loans To Officers',  },
    { id: 8, name: 'Loans To Others',  },
    { id: 9, name: 'Loans To Shareholders',  },
  ];


  tableConfig = {
    paginationParams: {
      total_pages: 1,
      payload_size: 10,
      has_next: false,
      current_page: 1,
      skipped_records: 0,
      total_records: 10
    }
  };
  
  selectAll() {
    this.selectedAccounts = this.accounts.map(account => account.id);
  }
  selectAllSubAccounts() {
    this.selectedSubAccounts = this.subAccounts.map(subaccount=>subaccount.id)
  }
  deselectAll() {
    this.selectedAccounts = [];
  }
  deselectAllSubAccounts() {
    this.selectedSubAccounts = [];
  }
  filterAccounts() {
    const query = this.SearchItems.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.name.toLowerCase().includes(query) ||
      account.category.toLowerCase().includes(query)
    );
  }
}
