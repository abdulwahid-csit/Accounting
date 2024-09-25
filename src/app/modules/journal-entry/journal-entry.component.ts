import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss']
})
export class JournalEntryComponent implements OnInit {

  applicationList: any[] = [];

  columns = [
    { name: 'Type', key: 'isChecked', isCheckbox: true },
    { name: 'Journal date', key: 'Journaldate', },

    { name: 'Number-Description', key: 'NumberDescription' },
    { name: 'Reference', key: 'Reference' },
    { name: 'Amount', key: 'Amount' }
  ];

  bsConfig = {
    isAnimated: true
  };

  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective | any;

  openDatepicker() {
    this.datepicker?.show();
  }
  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const response = {
      "status_code": 200,
      "message": "Paginated list with data and paginate options.",
      "data": {
        "payload": [
          {
            "id": 1,
            "Journaldate": "15/08/2024",
            "NumberDescription": "Accounts Receivable (A/R)",
            "Reference": "Expense",
            "Amount": "Accounts Receivable (A/R)",
          
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 2,
            "Journaldate": "15/08/2024",
            "NumberDescription": "Accrued holiday payable",
            "Reference": "Expensed",
            "Amount": "Traveled",
          
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 3,
            "Journaldate": "15/08/2024",
            "NumberDescription": "PreSales",
            "Reference": "Expensed",
            "Amount": "Traveled",
          
            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 4,
            "Journaldate": "15/08/2024",
            "NumberDescription": "Accrued non-current liabilities",
            "Reference": "Expensedive",
            "Amount": "Travelediner",
          
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


}
