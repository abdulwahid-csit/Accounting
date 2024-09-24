import { Component, ElementRef, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { AddBankComponent } from '../add-bank/add-bank.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { CrudService } from 'src/app/shared/services/crud.service';
@Component({
  selector: 'app-Bank-accounts',
  templateUrl: './Bank-accounts.component.html',
  styleUrls: ['./Bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {
  @ViewChild('deleteModel', { static: false }) deleteModel!: TemplateRef<any>;
  applicationList: any[] = [];
  modalRef: any;
  bankForm!: FormGroup;
  bankingData: any;
  @Input() deleteData : any
  @Input() changePage: any;
  selectedPageSize: number = 10; // Default page size
  currentPage: number = 1;
  constructor(private modalService: BsModalService,private toastr: ToastrService,
    private CrudService : CrudService

  ) { }
  columns = [
    { name: 'Check', key: 'isChecked', isCheckbox: true },
    { name: 'Opening Date', key: 'opening_date' },
    { name: 'Branch Name', key: 'branch_name' },
    { name: 'Bank Name', key: 'bank' },
    { name: 'Acoount Nature', key: 'account_natures' },
    { name: 'Title Of Account', key: 'name' },
    { name: 'Account Number', key: 'account_number' },
    { name: 'IBAN Number', key: 'iban_number' },
    { name: 'Opening balance', key: 'balance' },
    { name: 'Active', key: 'Active' },
    { name: 'Options', key: 'icons' }
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
    this.fetchBankingData();
    this.bankForm = new FormGroup({
      bankName: new FormControl('')
    });
  }

  addBank(data?: any) {
    data = data
    console.log("data for update",data)
    const initialState = { data: data};
    this.modalRef = this.modalService.show(AddBankComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg create_organization',
      backdrop: 'static',
      keyboard: true,
      initialState
    });
    this.modalRef.content.successCall.subscribe(() => {
      this.fetchBankingData();
    });
  }
  fetchBankingData(page: number = 1) {
    this.CrudService.readWithPaginations('banking',page,this.selectedPageSize).subscribe(
      (response: any) => {
        if (response?.data?.data?.payload) {
          this.bankingData = response?.data?.data?.payload;
          this.tableConfig.paginationParams = response?.data?.data?.paginate_options
          // console.log('Banking Data:', this.bankingData);
          // console.log(' this.tableConfig.paginationParams:',  this.tableConfig.paginationParams);
        } else {
          console.error('Unexpected response format', response);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  editRow(row: any) {
    this.addBank(row);
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

  openModal(template: TemplateRef<any>, cls: string, id: any) {
    this.itemToDelete = id;
    this.modalService.show(template, {
      class: 'modal-md ' + cls,
      backdrop: 'static',
      keyboard: false,
    });
  }
  delete(id?:any) {
   id = this.itemToDelete  
      this.CrudService.delete('banking',id).subscribe(
        response => {
          // console.log('Delete successful:', response);
          this.toastr.success('Item deleted successfully!', 'Success');
          this.fetchBankingData(); 
          this.closeModal();
        },
        error => {
          console.error('Error deleting banking resource:', error);
          this.toastr.error('Failed to delete item.', 'Error');
        }
      );
  }

  toggleSwitch(row: any) {
    row.someBooleanValue = !row.someBooleanValue; 
  }
  closeModal() {
    this.modalService.hide();
  }
  onPageChange(item: number) {
    this.changePage.emit(item); 
    this.fetchBankingData(item); 
  }
    onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSize = selectElement.value;

    // Handle 'All' option
    this.selectedPageSize = selectedSize === 'All' ? this.tableConfig.paginationParams.total_records : +selectedSize;

    // Reset to the first page when page size changes
    this.currentPage = 1;

    // Fetch data based on the new page size
    this.fetchBankingData(this.currentPage);
  }
}
