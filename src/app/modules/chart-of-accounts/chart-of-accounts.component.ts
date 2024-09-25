import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddAccountComponent } from './add-account/add-account.component';
import { CrudService } from 'src/app/shared/services/crud.service';

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
  accoutTypes: any;
  accountLevelOne: any;
  accountLevelTwo: any;
  accountLevelThree: any
  dataSet: any;

  applicationList: any[] = [];
  columns: any = [
    { name: 'Check', key: 'isChecked', isCheckbox: true },
    { name: 'name', key: 'name' },
    { name: 'account type', key: 'account type' },
    { name: 'Level 1', key: 'level_one' },
    { name: 'Level 2', key: 'level_two' },
    { name: 'Level 3', key: 'level_three' },
    { name: 'number', key: 'number' },
    { name: 'Description', key: 'description' },
    { name: 'Options', key: 'Options' },
    
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


  constructor(
    private modalService: BsModalService,
    private CrudService: CrudService
  ) { }

  ngOnInit() {
    this.applicationForm = new FormGroup({
      organization: new FormControl('', [Validators.required]),
    })
    this.getChartOfAccounts();
    this.getAccountTypes();
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


  addAccount() {
    this.modalService.show(AddAccountComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
      backdrop: 'static',
      keyboard: true,
    });
  }


  getChartOfAccounts() {
    this.CrudService.read('charts-of-accounts').subscribe(response => {
      if (response?.data?.status_code == 201 || response.data?.status_code == 200) {
        const column = Object.keys(response.data?.data?.payload[0]);
        this.columns = column.filter((column: string) => column !== '_id' &&
        column !== 'business' && column !== 'is_deleted' && column !== 'active');
        this.dataSet = response.data?.data?.payload;
        console.log("Columns are: ", this.columns);
        console.log("Charts of account data.", this.dataSet);
        this.tableConfig.paginationParams = response?.data?.data?.paginate_options      }
    }, error => {
      console.log("Error ", error.message)
    })
  }


  getAccountTypes() {
    this.CrudService.read('account-types/account-type').subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accoutTypes = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountLLevelOne(object: any) {
    console.log("Get Account level one called.")
    console.log("Object id is: ", object._id);
    this.CrudService.read('account-types/level-one', object._id).subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountLevelOne = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountLLevelTwo(object: any) {
    console.log("Account LEvel Two is called: ", object._id);
    this.CrudService.read('account-types/level-two').subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountLevelTwo = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountLLevelThree(object: any) {
    this.CrudService.read('account-types/level-three').subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountLevelThree = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }

}
