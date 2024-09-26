import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-item-mapping-setup',
  templateUrl: './item-mapping-setup.component.html',
  styleUrls: ['./item-mapping-setup.component.scss']
})
export class ItemMappingSetupComponent {
  form: FormGroup;
  settingForm!: FormGroup;
  bankingData: any;
  user: any;
  @Input() data: any;
  @Output() successCall = new EventEmitter<void>();
  isUpdateMode: boolean = false;
  constructor(private fb: FormBuilder, private modalService: BsModalService,private CrudService: CrudService,private LocalStoreService: LocalStoreService , private toastr: ToastrService) {
    this.form = this.fb.group({
      debitEntries: this.fb.array([this.createDebitEntry()]),
      creditEntries: this.fb.array([this.createCreditEntry()])
    });
  }
  ngOnInit() {
    this.initForm()
    this.fetchBankingData();
    this.forBussinessId();
    if(this.data){
      this.isUpdateMode = true
      this.fillFormData();
    }
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

  forBussinessId(){
    this.user = this.LocalStoreService.getItem('user');
  }

  close() {
    this.modalService.hide();
  }
  initForm() {
    const validation = {
      item:[null,Validators.compose([Validators.required])],
      business:[""],
      inventory_asset_account:[""],
      income_account:[""],
      expense_account:[""],
    };
    this.settingForm = this.fb.group(validation);
  }
  fetchBankingData(page: number = 1) {
    this.CrudService.read('banking').subscribe(
      (response: any) => {
        if (response?.data?.data?.payload) {
          // Extracting the payload
          this.bankingData = response.data.data.payload.map((item: any) => {
            return {
              _id: item._id,
              name: item.name, // Use account name
              account_number: item.account_number // Optional: Add account number if needed
            };
          });
        } else {
          console.error('Unexpected response format', response);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  submitForm() {
    if(this.settingForm?.invalid){
      this.toastr.error('please fill all fileds', 'Error');
      this.settingForm?.markAllAsTouched();
    return
    }
    const postData = this.settingForm.value
    postData['business'] = this.user.business
    this.CrudService.create('item-mapping-setup',postData).subscribe(
      response => {
        // console.log('Response:', response);
        this.toastr.success(
           'form saved successfully',
          'Success'
        );
        this.close();
        this.successCall.emit();
      },
      error => {
        this.toastr.error(error.massege, 'Error');
        console.error('Error:', error);
      }
    );
  }
  fillFormData() {
    console.log("data for update",this.data)
    if (this.data) {
      this.settingForm.patchValue({
        item: this.data.item._id || null,
        expense_account: this.data.expense_account._id || null,
        income_account: this.data.income_account._id || null,
        inventory_asset_account: this.data.inventory_asset_account._id || null,
        business: this.data.business || this.user.business
      });
    }
  }
  updateForm() {
    const postData = this.settingForm.value
    postData['business'] = this.user.business
    this.CrudService.update('item-mapping-setup',this.data?._id,postData).subscribe(
      response => {
        // console.log('Response:', response);
        this.toastr.success(
          'form updated successfully',
         'Success'
       );
        this.close();
        this.successCall.emit();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
