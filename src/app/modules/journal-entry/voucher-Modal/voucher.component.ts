import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.form = this.fb.group({
      debitEntries: this.fb.array([this.createDebitEntry()]),
      creditEntries: this.fb.array([this.createCreditEntry()])
    });
  }

  get debitEntries(): FormArray {
    return this.form.get('debitEntries') as FormArray;
  }

  get creditEntries(): FormArray {
    return this.form.get('creditEntries') as FormArray;
  }

  createDebitEntry(): FormGroup {
    return this.fb.group({
      typeOfAccount: [''],
      branchNameDebit: [''],
      branchAccountDebit: [''],
      headOfAccountDebit: [''],
      majorHeadOfAccountDebit: [''],
      minorHeadOfAccountDebit: [''],
      description: [''],
      debitAmount: [''],
      debitDate: ['']
    });
  }

  createCreditEntry(): FormGroup {
    return this.fb.group({
      typeOfAccount: [''],
      branchNameCredit: [''],
      branchAccountCredit: [''],
      headOfAccountCredit: [''],
      majorHeadOfAccountCredit: [''],
      minorHeadOfAccountCredit: [''],
      description: [''],
      creditAmount: [''],
      creditDate: ['']
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
}
