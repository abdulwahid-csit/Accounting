import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  applicationList: any[] = [];
  columns = [
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

  total_pages = 1;
  payload_size = 10;
  current_page = 1;
  has_next = false;
  skipped_records = 0;
  total_records = 10;

  modalRef?: BsModalRef;
  searchTerm: string = '';
  searchType: boolean = false;

  constructor() { }

  ngOnInit() {
    // Simulate fetching data
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
            "Date": "2024-09-01"
          },
          // More objects as needed
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

    // Set the applicationList and tableConfig from the response
    if (response && response.data && response.data.payload) {
      this.applicationList = response.data.payload;
      this.tableConfig.paginationParams = response.data.paginate_options;
      this.total_pages = response.data.paginate_options.total_pages;
      this.payload_size = response.data.paginate_options.payload_size;
      this.current_page = response.data.paginate_options.current_page;
      this.has_next = response.data.paginate_options.has_next;
      this.skipped_records = response.data.paginate_options.skipped_records;
      this.total_records = response.data.paginate_options.total_records;
    }
  }

  setupColumns() {
    // Implement your logic here if needed
  }
}
