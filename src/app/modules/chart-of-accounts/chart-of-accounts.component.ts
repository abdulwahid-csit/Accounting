import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddAccountComponent } from './add-account/add-account.component';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss', '../../css/custpm-dropdown-style.scss']
})
export class ChartOfAccountsComponent implements OnInit {
  applicationForm!: FormGroup;
  isFocused: boolean = false;
  isAccountFocus = false;
  isParrentAccountFocus = false;
  isTypeFoucus = false;
  isDetailTypeFocus = false;
  isStatusFocus = false;

  applicationList: any[] = [];
  columns = [
    { name: 'Check', key: 'isChecked', isCheckbox: true },
    { name: 'Name', key: 'Name' },
    { name: 'Parent Account', key: 'ParentAccount' },
    { name: 'Guy', key: 'Type' },
    { name: 'Type of Details', key: 'DetailType' },
    { name: 'Primary Balance', key: 'PrimaryBalance' },
    { name: 'Bank Balance', key: 'BankBalance' },
    { name: 'Assets', key: 'Active' },
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

 response = {
    "status_code": 200,
    "message": "Paginated list with data and paginate options.",
    "data": {
      "payload": [
        {
          "id": 1,
          "Name": "Sales of Product Income",
          "ParentAccount": "",
          "Guy": "Income",
          "Type Of Details": "Unapplied Cash Payment Income",
          "PrimaryBalance": 1200.50,
          "BankBalance": null,
          "Assets": true,
          "Options": "History",
          // "Date": "2024-09-01",
          // "isChecked": false
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



  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    if (this.response && this.response.data && this.response.data.payload) {
      this.applicationList = this.response.data.payload;
      this.tableConfig.paginationParams = this.response.data.paginate_options;
      // this.total_pages = this.response.data.paginate_options.total_pages;
      // this.payload_size = this.response.data.paginate_options.payload_size;
      // this.current_page = this.response.data.paginate_options.current_page;
      // this.has_next = this.response.data.paginate_options.has_next;
      // this.skipped_records = this.response.data.paginate_options.skipped_records;
      // this.total_records = this.response.data.paginate_options.total_records;
    }
    this.applicationForm = new FormGroup({
      organization: new FormControl('', [Validators.required]),
    })
  }

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.applicationForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }


  onSelectFoucus() {
    console.log("NG slect focused");
    this.isFocused = true;
  }

  onNgSelectBlur() {
    this.isFocused = false;
    console.log("Ng select blured.")
  }


  addAccount(){
    this.modalService.show(AddAccountComponent, {
      class: 'modal-dialog modal-dialog-centered modal-xl create_organization',
      backdrop: 'static',
      keyboard: true,
    });
  }

}
