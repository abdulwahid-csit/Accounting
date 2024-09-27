import { Component, OnInit } from '@angular/core';
import { ItemMappingSetupComponent } from '../item-mapping-setup/item-mapping-setup.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ExpenseCategoryMappingComponent } from '../expense-category-mapping/expense-category-mapping.component';
import { PaymentTaxMappingComponent } from '../payment-tax-mapping/payment-tax-mapping.component';
import { PaymentModeMappingComponent } from '../payment-mode-mapping/payment-mode-mapping.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
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
settingForm!: FormGroup;
applicationList: any[] = [];

columns = [
  { name: 'Description', },
  { name: 'Rate',  },
  { name: 'Group Name',  },
 
];
  modalRef: any;
  bankingData: any;
  user: any;

constructor(private modalService: BsModalService,private fb: FormBuilder, private CrudService:CrudService,
private LocalStoreService: LocalStoreService,private toastr:ToastrService

) { }

  ngOnInit() {
    this.initForm();
    this.forBussinessId();
    this.fetchItemData();
  }
  forBussinessId(){
    this.user = this.LocalStoreService.getItem('user');
  }
  initForm() {
    const validation = {
      // item:[null,Validators.compose([Validators.required])],
      // branch_name:[null,Validators.compose([Validators.required])],
      // account_natures:[null,Validators.compose([Validators.required])],
      // account_number: [null, Validators.compose([Validators.required])],
      // iban_number: [null, Validators.compose([Validators.required])],
      // inventory_asset_account:[null],
      item:[""],
      business:[""],
      inventory_asset_account:[""],
      income_account:[""],
      expense_account:[""],
      // bank:[null,Validators.compose([Validators.required])],
    };
    this.settingForm = this.fb.group(validation);
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
  openitemModal(data?: any) {
    data = data
    console.log("data for update",data)
    const initialState = { data: data};
    this.modalRef = this.modalService.show(ItemMappingSetupComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg ',
      backdrop: 'static',
      keyboard: true,
      initialState
    });
    this.modalRef.content.successCall.subscribe(() => {
      this.fetchItemData();
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
  // tax 
  opentaxModal() {
    this.modalService.show(PaymentTaxMappingComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg ',
      backdrop: 'static',
      keyboard: true,
    });
  }
  // payment
  openPaymentModal() {
    this.modalService.show(PaymentModeMappingComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg ',
      backdrop: 'static',
      keyboard: true,
    });
  }
  fetchItemData(page: number = 1) {
    this.CrudService.read('item-mapping-setup').subscribe(
      (response: any) => {
        if (response?.data?.data?.payload) {
          this.bankingData = response?.data?.data?.payload
          // console.log("this.bankingData",this.bankingData)
          // Extracting the payload
          // this.bankingData = response.data.data.payload.map((item: any) => {
          //   return {
          //     _id: item._id,
          //     name: item.name, // Use account name
          //     account_number: item.account_number // Optional: Add account number if needed
          //   };
          // });
        } else {
          console.error('Unexpected response format', response);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  editMethod(row:any){
  this.openitemModal(row)
  }
  itemToDelete: any; 
  deleteRow(row: any): void {
    this.itemToDelete = row._id;
    const initialState = { description: 'Are you sure you want to delete this item?' };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
      backdrop: 'static',
      keyboard: true,
      initialState
    });

    this.modalRef.content.deleteData.subscribe(() => {
      this.delete(this.itemToDelete);
    });
  }
  delete(id?:any) {
    id = this.itemToDelete  
       this.CrudService.delete('item-mapping-setup',id).subscribe(
         response => {
           // console.log('Delete successful:', response);
           this.toastr.success('Item deleted successfully!', 'Success');
           this.fetchItemData(); 
          //  this.close();
         },
         error => {
           console.error('Error deleting banking resource:', error);
           this.toastr.error('Failed to delete item.', 'Error');
         }
       );
   }
}
