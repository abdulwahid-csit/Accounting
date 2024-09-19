import { Component, OnInit } from '@angular/core';
import { ItemMappingSetupComponent } from '../item-mapping-setup/item-mapping-setup.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ExpenseCategoryMappingComponent } from '../expense-category-mapping/expense-category-mapping.component';
import { PaymentTaxMappingComponent } from '../payment-tax-mapping/payment-tax-mapping.component';

@Component({
  selector: 'app-generaltab',
  templateUrl: './generaltab.component.html',
  styleUrls: ['./generaltab.component.scss','../../../../css/custpm-dropdown-style.scss']
})
export class GeneraltabComponent implements OnInit {
isSwitchChecked: boolean = false;
isPaymentChecked:boolean = false;
isExpensesChecked:boolean = false;
isRefundChecked:boolean = false;
isSalesChecked:boolean = false;
isTaxChecked:boolean = false;
isExpenseChecked:boolean = false;


applicationList: any[] = [];

columns = [
  { name: 'Description', },
  { name: 'Rate',  },
  { name: 'Group Name',  },
 
];

constructor(private modalService: BsModalService) { }

  ngOnInit() {
    // const response = {
    //   "status_code": 200,
    //   "message": "Paginated list with data and paginate options.",
    //   "data": {
    //     "payload": [
    //       {
    //         "id": 1,
    //         "Journaldate": "15/08/2024",
    //         "NumberDescription": "Accounts Receivable (A/R)",
    //         "Reference": "Expense",
    //         "Amount": "Accounts Receivable (A/R)",
          
    //         "Active": true,
    //         "Options": "Edit",
    //         "Date": "2024-09-01",
    //         "isChecked": false
    //       },
    //       {
    //         "id": 2,
    //         "Journaldate": "15/08/2024",
    //         "NumberDescription": "Accrued holiday payable",
    //         "Reference": "Expensed",
    //         "Amount": "Traveled",
          
    //         "Active": true,
    //         "Options": "Edit",
    //         "Date": "2024-09-01",
    //         "isChecked": false
    //       },
    //       {
    //         "id": 3,
    //         "Journaldate": "15/08/2024",
    //         "NumberDescription": "PreSales",
    //         "Reference": "Expensed",
    //         "Amount": "Traveled",
          
    //         "Active": true,
    //         "Options": "Edit",
    //         "Date": "2024-09-01",
    //         "isChecked": false
    //       },
    //       {
    //         "id": 4,
    //         "Journaldate": "15/08/2024",
    //         "NumberDescription": "Accrued non-current liabilities",
    //         "Reference": "Expensedive",
    //         "Amount": "Travelediner",
          
    //         "Active": true,
    //         "Options": "Edit",
    //         "Date": "2024-09-01",
    //         "isChecked": false
    //       },

    //     ],
    //     "paginate_options": {
    //       "total_pages": 1,
    //       "payload_size": 10,
    //       "has_next": false,
    //       "current_page": 1,
    //       "skipped_records": 0,
    //       "total_records": 10
    //     }
    //   },
    //   "timestamp": "2024-09-10T08:06:46.886Z"
    // };

    // if (response && response.data && response.data.payload) {
    //   this.applicationList = response.data.payload;
    //   this.tableConfig.paginationParams = response.data.paginate_options;
    //   // this.total_pages = response.data.paginate_options.total_pages;
    //   // this.payload_size = response.data.paginate_options.payload_size;
    //   // this.current_page = response.data.paginate_options.current_page;
    //   // this.has_next = response.data.paginate_options.has_next;
    //   // this.skipped_records = response.data.paginate_options.skipped_records;
    //   // this.total_records = response.data.paginate_options.total_records;
    // }
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

//  item model
  openitemModal() {
    this.modalService.show(ItemMappingSetupComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg ',
      backdrop: 'static',
      keyboard: true,
    });
  }
  // expense 
  openExpenseModal() {
    this.modalService.show(ExpenseCategoryMappingComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg ',
      backdrop: 'static',
      keyboard: true,
    });
  }
  // tax and payment
  openPaymentModal() {
    this.modalService.show(PaymentTaxMappingComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg ',
      backdrop: 'static',
      keyboard: true,
    });
  }

}
