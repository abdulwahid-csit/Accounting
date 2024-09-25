import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { JournalService } from './journal.service'; // Adjust the import path as needed
// import { SerialNumberResponse } from './journal.model'; // Adjust the import path as needed

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  form: FormGroup;
  serialNumber: string = '';
  applicationList = [] = []
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private crudService: CrudService
  ) {
    this.form = this.fb.group({
      debitEntries: this.fb.array([this.createDebitEntry()]),
      creditEntries: this.fb.array([this.createCreditEntry()]),
      serialNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.loadSerialNumber();
  }

  get debitEntries(): FormArray {
    return this.form.get('debitEntries') as FormArray;
  }

  get creditEntries(): FormArray {
    return this.form.get('creditEntries') as FormArray;
  }

  createDebitEntry(): FormGroup {
    return this.fb.group({
      typeOfAccount: ['', Validators.required],
      branchNameDebit: ['', Validators.required],
      branchAccountDebit: ['', Validators.required],
      headOfAccountDebit: ['', Validators.required],
      majorHeadOfAccountDebit: ['', Validators.required],
      minorHeadOfAccountDebit: ['', Validators.required],
      description: ['', Validators.required],
      debitAmount: ['', [Validators.required, Validators.min(1)]],
      debitDate: ['', Validators.required]
    });
  }

  createCreditEntry(): FormGroup {
    return this.fb.group({
      typeOfAccount: ['', Validators.required],
      branchNameCredit: ['', Validators.required],
      branchAccountCredit: ['', Validators.required],
      headOfAccountCredit: ['', Validators.required],
      majorHeadOfAccountCredit: ['', Validators.required],
      minorHeadOfAccountCredit: ['', Validators.required],
      description: ['', Validators.required],
      creditAmount: ['', [Validators.required, Validators.min(1)]],
      creditDate: ['', Validators.required]
    });
  }

  addDebitEntry(): void {
    this.debitEntries.push(this.createDebitEntry());
  }

  removeDebitEntry(index: number): void {
    this.debitEntries.removeAt(index);
  }

  addCreditEntry(): void {
    this.creditEntries.push(this.createCreditEntry());
  }

  removeCreditEntry(index: number): void {
    this.creditEntries.removeAt(index);
  }

  close() {
    this.modalService.hide();
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

  save() {
    if (this.form.valid) {
      const formData = {
        debitEntries: this.debitEntries.value,
        creditEntries: this.creditEntries.value,
        serialNumber: this.serialNumber,
      };
      console.log('Form Data:', formData);
     
    } else {
      console.log('Form is invalid');
    }
  }



  // fetchData() {
  //   this.crudService.read('journal-voucher').subscribe(response => {
  //     if(response.data?.status_code == 201){
  //       this.applicationList = response.data?.data?.payload;
  //       this.tableConfig.paginationParams.total_records = response.data?.data?.total_records;
  //       console.log("Data Fetched, ", response);
  //     }
  //   }, error => {
  //     console.log("Error", error.message);
  //   })
  // }
  
  // loadSerialNumber() {
  //   this.crudService.getSerialNumber().subscribe(
  //     (response) => { // Specify the type here
  //       this.serialNumber = response.serialNumber; 
  //       this.form.get('serialNumber')?.setValue(this.serialNumber);
  //       console.log('serialNumber', this.serialNumber)
  //     },
  //     (error) => {
  //       console.error('Error fetching serial number:', error);
  //     }
  //   );
  // }
}


