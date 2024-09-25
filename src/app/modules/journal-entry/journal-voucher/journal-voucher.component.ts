import { Component, ViewChild } from '@angular/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { VoucherComponent } from '../voucher-Modal/voucher.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.scss']
})
export class JournalVoucherComponent {
  applicationList: any[] = [];

  columns = [
    { name: 'Type', key: 'isChecked', isCheckbox: true },
    { name: 'Voucher Number', key: 'Voucher Number', },
    { name: 'Date', key: 'Date' },
    { name: 'Description', key: 'Description' },
    { name: 'Account Debit', key: 'Account Debit' },
    { name: 'Account Credit', key: 'Account Credit' },
    { name: 'Balance', key: 'Balance' },
    { name: 'Status', key: 'Status' },
    { name: 'Mapping status', key: 'Mapping status' },
    { name: 'Mapping ', key: 'Mapping' },


  ];

  bsConfig = {
    isAnimated: true
  };

  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective | any;

  openDatepicker() {
    this.datepicker?.show();
  }
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    const response = {
      "status_code": 200,
      "message": "Paginated list with data and paginate options.",
      "data": {
        "payload": [
          {
            "id": 1,
            "Voucher Number": "15/08/2024",
            "Description": "Accounts Receivable (A/R)",
            "Account Debit": "Expense",
            "Account Credit": "Accounts Receivable (A/R)",
            "Balance":"$34637",
            "Status":"Approved",
            "Mapping status":"Has Been Mapped",
            "Mapping":"arrow",

            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 2,
            "Voucher Number": "15/08/2024",
            "Description": "Accrued holiday payable",
            "Account Debit": "Expensed",
            "Account Credit": "Traveled",
            "Balance":"$34637",
            "Status":"Approved",
            "Mapping status":"Has Been Mapped",
            "Mapping":"arrow",

            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 3,
            "Voucher Number": "15/08/2024",
            "Description": "PreSales",
            "Account Debit": "Expensed",
            "Account Credit": "Traveled",
            "Balance":"$34637",
            "Status":"Approved",
            "Mapping status":"Has Been Mapped",
            "Mapping":"arrow",

            "Active": true,
            "Options": "Edit",
            "Date": "2024-09-01",
            "isChecked": false
          },
          {
            "id": 4,
            "Voucher Number": "15/08/2024",
            "Description": "Accrued non-current liabilities",
            "Account Debit": "Expensedive",
            "Account Credit": "Travelediner",
            "Balance":"$34637",
            "Status":"Approved",
            "Mapping status":"Has Been Mapped",
            "Mapping":"arrow",

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
  // @ViewChild(VoucherComponent, { static: false }) VoucherComponent!: VoucherComponent;



  openVoucherModal() {
    this.modalService.show(VoucherComponent, {
      class: 'modal-dialog modal-dialog-centered modal-xl create_organization',
      backdrop: 'static',
      keyboard: true,
    });
  }

}
