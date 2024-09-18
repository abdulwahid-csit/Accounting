import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { AddAccountComponent } from '../../chart-of-accounts/add-account/add-account.component';

@Component({
  selector: 'app-Bank-accounts',
  templateUrl: './Bank-accounts.component.html',
  styleUrls: ['./Bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {

  applicationList: any[] = [];
  modalRef: any;
  bankForm!: FormGroup;
  constructor(private modalService: BsModalService,) { }
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

  ngOnInit() {
    this.bankForm = new FormGroup({
      bankName: new FormControl('')
      // Add more controls as needed
    });

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
    }
  }

  addBank() {

    const initialState = { itemList: '', title: 'Create' };
    this.modalRef = this.modalService.show(AddAccountComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
      backdrop: 'static',
      keyboard: true,

    });
    // this.modalRef.content.successCall.subscribe(() => {
    //   this.applicationListing(1);
    // });
  }

}
