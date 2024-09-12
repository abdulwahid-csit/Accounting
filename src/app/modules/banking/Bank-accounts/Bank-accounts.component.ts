import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Bank-accounts',
  templateUrl: './Bank-accounts.component.html',
  styleUrls: ['./Bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {

  applicationList: any[] = [];
  columns = [
    { name: 'Check', key: 'isChecked', isCheckbox: true },
    { name: 'Name', key: 'Name' },
    { name: 'Parent Account', key: 'ParentAccount' },
    { name: 'Type', key: 'Type' },
    { name: 'Detail Type', key: 'DetailType' },
    { name: 'Primary Balance', key: 'PrimaryBalance' },
    { name: 'Bank Balance', key: 'BankBalance' },
    { name: 'Active', key: 'Active' },
    { name: 'Options', key: 'Options' }
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

  // total_pages = 1;
  // payload_size = 10;
  // current_page = 1;
  // has_next = false;
  // skipped_records = 0;
  // total_records = 10;

  // modalRef?: BsModalRef;
  // searchTerm: string = '';
  // searchType: boolean = false;

  constructor() { }

  ngOnInit() {

    const response = {
      "status_code": 200,
      "message": "Paginated list with data and paginate options.",
      "data": {
        "payload": [
          {
            "id": 1,
            "Name": "John Doe",
            "ParentAccount": "Sales",
            "Type": "Expense",
            "DetailType": "Travel",
            "PrimaryBalance": 1200.50,
            "BankBalance": 800.75,
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 2,
            "Name": "Asim Doe",
            "ParentAccount": "PreSales",
            "Type": "Expensed",
            "DetailType": "Traveled",
            "PrimaryBalance": 1200.50,
            "BankBalance": 800.75,
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 3,
            "Name": "Wahid Doe",
            "ParentAccount": "PreSales",
            "Type": "Expensed",
            "DetailType": "Traveled",
            "PrimaryBalance": 1400.50,
            "BankBalance": 1800.75,
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 4,
            "Name": "Afaq Doe",
            "ParentAccount": "InSales",
            "Type": "Expensedive",
            "DetailType": "Travelediner",
            "PrimaryBalance": 2200.50,
            "BankBalance": 3400.75,
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

  setupColumns() {

  }
}
