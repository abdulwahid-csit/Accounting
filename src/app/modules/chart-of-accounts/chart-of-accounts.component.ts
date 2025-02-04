import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddAccountComponent } from './add-account/add-account.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { RECORDS_LIMIT } from 'src/app/shared/constants/records-limit';
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
  itemToDelete: any;
  modalRef!: BsModalRef;
  applicationList: any[] = [];
  selectedPageSize = 20;
  currentPage: number = 1;
  @Input() changePage: any;
  filterLAstOptionId!: string;
  recordsPerPage: string[] = RECORDS_LIMIT;
  selectedAccountTypeId!: string;
  selectedAccountLevelOneId!: string;
  selectedAccountLevelTwoId!: string;
  selectedAccountLevelThreeId!: string;
  selectedAccountStatus!: string;
  firstPage = 10;
  searchByName: string = '';
  
  columns: any = [
    { name: 'Check', key: 'isChecked', isCheckbox: true },
  ];

  tableConfig = {
    paginationParams: {
      total_pages: 1,
      payload_size: 20,
      has_next: false,
      current_page: 1,
      skipped_records: 0,
      total_records: 10
    }
  };


  constructor(
    private modalService: BsModalService,
    private CrudService: CrudService,
    private toastr: ToastrService
  ) {

  }


  ngOnInit() {

    this.applicationForm = new FormGroup({
      organization: new FormControl('', [Validators.required]),
    })
    this.getChartOfAccounts();
    this.getAccountTypes();
    // this.getAccountLLevelOne();
    // this.getAccountLLevelTwo();
    // this.getAccountLLevelThree();
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
    this.isFocused = true;
  }


  onNgSelectBlur() {
    this.isFocused = false;
  }


  addAccount(data?: any) {
    const initialState = { dataForUpdate: data };
    this.modalRef = this.modalService.show(AddAccountComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
      backdrop: 'static',
      keyboard: true,
      initialState
    });

    if (this.modalRef?.content) {
      this.modalRef.content = { isRecordAdded: false };
      this.modalRef.onHidden?.subscribe(() => {
        const isRecordAdded = this.modalRef?.content?.isRecordAdded;
        if (isRecordAdded === true) {
          this.getChartOfAccounts();
        }
      });
    }
  }


  getChartOfAccounts(page: number = 1, pageSize?: number) {
    this.CrudService.readWithPaginations('charts-of-accounts', page, pageSize).subscribe(response => {
      if (response?.data?.status_code == 201 || response.data?.status_code == 200) {
        const column = Object.keys(response.data?.data?.payload[0]);
        this.columns = column.filter((column: string) => column !== '_id' &&
          column !== 'business' && column !== 'is_deleted' && column !== 'active');
        this.dataSet = response.data?.data?.payload;
        this.columns.push('actions');
        this.columns.unshift('isChecked');
        this.tableConfig.paginationParams = response?.data?.data?.paginate_options;
      }
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


  getAccountLLevelOne() {
    this.CrudService.read('account-types/level-one').subscribe(response => {
      if (response.data?.status_code == 201 || response.data?.status_code == 200) {
        this.accountLevelOne = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountLLevelTwo() {
    this.CrudService.read('account-types/level-two').subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountLevelTwo = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountLLevelThree() {
    this.CrudService.read('account-types/level-three').subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountLevelThree = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountTypesOrLevels(object: any, accountLevelName: string,) {
    if (object) {
      var id = object._id;
    }
    switch (accountLevelName) {
      case 'account-type':
        this.getChartOfAccounts();
        this.selectedAccountTypeId = id;
        if (id) {
          this.CrudService.read('account-types/level-one?accountType=' + id).subscribe(response => {
            if (response.data?.status_code == 201 || response.data?.status_code == 200) {
              this.accountLevelOne = response.data?.data?.payload;
            }
          }, error => {
            console.log("Error while frtcing account types: ", error.message);
          })
          this.getFilterChartsOfAccounts()
        }
        break;

      case 'level-one':
        this.selectedAccountLevelOneId = id;
        this.CrudService.read('account-types/level-two?accountType=' + this.selectedAccountTypeId).subscribe(response => {
          if (response.data?.status_code == 201 || response.data?.status_code == 200) {
            this.accountLevelTwo = response.data?.data?.payload;
          }
        }, error => {
          console.log("Error while frtcing account types: ", error.message);
        })
        this.getFilterChartsOfAccounts()
        break;

      case 'level-two':
        this.selectedAccountLevelTwoId = id;
        this.CrudService.read('account-types/level-three?accountType=' + this.selectedAccountTypeId).subscribe(response => {
          if (response.data?.status_code == 201 || response.data?.status_code == 200) {
            this.accountLevelThree = response.data?.data?.payload;
          }
        }, error => {
          console.log("Error while frtcing account types: ", error.message);
        })
        this.getFilterChartsOfAccounts()
        break;

      case 'level-three':
        this.selectedAccountLevelThreeId = id;
        this.getFilterChartsOfAccounts();
        break;

      case 'status':
        this.selectedAccountStatus = object;
        this.getFilterChartsOfAccounts();
        break;
    }
  }


  editChartsOfAccount(data: any) {
    this.addAccount(data);
  }


  deleteChartOFAccoundData(data: any) {
    // this.itemToDelete = data._id;
    const initialState = { description: 'Are you sure you want to delete this item?' };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
      backdrop: 'static',
      keyboard: true,
      initialState
    });

    this.modalRef.content.deleteData.subscribe(() => {
      this.delete(data?._id);
    });
  }


  delete(id: any) {
    this.CrudService.delete('charts-of-accounts', id).subscribe(response => {
      this.getChartOfAccounts();
      this.toastr.success('Item deleted successfully!', 'Success');
      this.modalRef.hide();
    }, error => {
      this.toastr.error(error.message, 'Error');
    })
  }


  onPageSizeChange(event: string) {
    const selectedSize = event;
    this.selectedPageSize = selectedSize === 'All' ? this.tableConfig.paginationParams.total_records : +selectedSize;
    console.log("Total Records in table config are: ", this.tableConfig.paginationParams.total_records);
    this.currentPage = 1;
    this.getChartOfAccounts(this.currentPage, this.selectedPageSize);
  }


  getFilterChartsOfAccounts(event?: KeyboardEvent) {
    if(event){
      let target = event.target as HTMLInputElement;
      var searchTerm = target.value;
      this.searchByName = searchTerm;
    }
    let filterIds = {
      accountType: this.selectedAccountTypeId ? `accountType=${this.selectedAccountTypeId}` : '',
      levelOne: this.selectedAccountLevelOneId ? `accountType=${this.selectedAccountTypeId}` : '',
      levelTwo: this.selectedAccountLevelTwoId ? `accountType=${this.selectedAccountTypeId}` : '',
      levelThree: this.selectedAccountLevelThreeId ? `accountType=${this.selectedAccountTypeId}` : '',
      active: this.selectedAccountStatus ? `active=${this.selectedAccountStatus}` : '',
      search: this.searchByName ? `search=${this.searchByName}` : ''
    };
    let queryParams = Object.values(filterIds)
      .filter(param => param)
      .join('&');

    this.CrudService.read(`charts-of-accounts?${queryParams}`).subscribe(response => {
      if (response.data?.status_code == 200 || response.data?.status_code == 201) {
        this.dataSet = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error ", error);
    });
  }


  getChartsOfAccountsByName(event: KeyboardEvent){
    let target = event.target as HTMLInputElement;
    let searchTerm = target.value;
    console.log("Serach term ", searchTerm);
  }
}