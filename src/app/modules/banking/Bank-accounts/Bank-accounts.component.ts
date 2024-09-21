import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { AddBankComponent } from '../add-bank/add-bank.component';
import { BankingService } from '../banking.service';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private modalService: BsModalService,private bankinService: BankingService,private toastr: ToastrService) { }
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
      // Add more controls as needed
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
  fetchBankingData() {
    this.bankinService.getBankResource().subscribe(
      (response: any) => {
        if (response?.data?.data?.payload) {
          this.bankingData = response?.data?.data?.payload;
          console.log('Banking Data:', this.bankingData);
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
  itemToDelete: any; // Store the item to delete
  deleteRow(row: any) {
    this.itemToDelete = row._id; 
    this.openModal(this.deleteModel, 'modal-dialog modal-dialog-centered modal-sm', row._id);
  }

  openModal(template: TemplateRef<any>, cls: string, id: any) {
    this.itemToDelete = id;
    this.modalService.show(template, {
      class: 'modal-md ' + cls,
      backdrop: 'static',
      keyboard: false,
    });
  }
  delete() {
   const id = this.itemToDelete
    console.log('BankingService:', this.bankinService);
    if (!this.bankinService) {
      console.error('BankingService is not defined!');
      return;
    }   
      this.bankinService.deleteBankingResource(id).subscribe(
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
}
