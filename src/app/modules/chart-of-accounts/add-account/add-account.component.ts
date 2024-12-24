import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss', '../../../css/custpm-dropdown-style.scss', '../../../css/custom-datepicker-style.scss']
})
export class AddAccountComponent implements OnInit {

  applicationForm!: FormGroup;
  isAccountFocus = false;
  isParrentAccountFocus = false;
  isTypeFoucus = false;
  isDetailTypeFocus = false;
  isStatusFocus = false;
  isAccounLevelFocus = false
  isLevelThreeFocus = false;
  editorContent = ''
  selectedAccountLevel = 'Level - 1';
  accountTypeId!: string;
  accountTypes: any;
  accountDetailsTypes: any;
  accountLevelOne: any;
  accountLevelTwo: any;
  accountLevelThree: any
  dataForUpdate: any;
  isUpdateMode = false;
  @ViewChild('printSection', { static: false }) printSection!: ElementRef;

  constructor(private modalref: BsModalRef, private CrudService: CrudService, private toastService: ToastrService, private locaStorage: LocalStoreService) { }

  ngOnInit() {
    this.initializeForm();
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


  closeModal(result: boolean): void {
    this.modalref.hide();
    this.modalref.content.isRecordAdded = result;
  }


  initializeForm() {

    this.applicationForm = new FormGroup({
      account_level: new FormControl('Level - 1'),
      account_type: new FormControl(null, [Validators.required]),
      level_one: new FormControl(null, [Validators.required]),
      level_two: new FormControl(null),
      level_three: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    })
    if (this.dataForUpdate) {
      this.accountTypeId = this.dataForUpdate?.account_type?._id;
      this.getAccountLLevelOne(this.accountTypeId);
      this.getAccountLLevelThree();
      this.getAccountLLevelTwo();
      if (this.dataForUpdate?.level_three) {
        this.selectedAccountLevel = 'Level - 3'
      } else if (this.dataForUpdate?.level_two) {
        this.selectedAccountLevel = 'Level - 2'
        this.getAccountLLevelTwo()
      } else {
        this.selectedAccountLevel = 'Level - 1'
      }
      if (this.dataForUpdate?.level_tow && this.dataForUpdate?.level_three) {
      }
      this.isUpdateMode = true;
      const data = this.dataForUpdate;
      this.applicationForm.patchValue({
        account_level: this.selectedAccountLevel,
        account_type: data?.account_type?._id,
        level_one: data?.level_one?._id,
        level_two: data?.level_two?._id,
        level_three: data?.level_three?._id,
        name: data?.name,
        number: data?.number,
        description: data?.description,
      });
    } else {
      this.isUpdateMode = false;
    }
  }

  setAccountFieldsVisibility(value: string) {
    this.selectedAccountLevel = value;
    this.applicationForm.markAsUntouched();
    if (value == 'Level - 2') {
      this.applicationForm?.get('level_one')?.setValidators(Validators.required);
      this.applicationForm?.get('level_two')?.setValidators(Validators.required);
    }
    else if (value == 'Level - 3') {
      this.applicationForm?.get('level_one')?.setValidators(Validators.required);
      this.applicationForm?.get('level_two')?.setValidators(Validators.required);
      this.applicationForm?.get('level_three')?.setValidators(Validators.required);
    }
    else {
      this.applicationForm?.get('level_one')?.setValidators(Validators.required);
      this.applicationForm?.get('level_two')?.clearValidators();
      this.applicationForm?.get('level_three')?.clearValidators();
    }

    this.applicationForm?.get('level_one')?.updateValueAndValidity();
    this.applicationForm?.get('level_two')?.updateValueAndValidity();
    this.applicationForm?.get('level_three')?.updateValueAndValidity();
  }


  getAccountTypes() {
    this.CrudService.read('account-types/account-type').subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountTypes = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountLLevelOne(id: any) {
    this.applicationForm.get('level_one')?.reset();
    this.applicationForm.get('level_two')?.reset();
    this.applicationForm.get('level_three')?.reset();
    this.accountLevelTwo = [];
    this.accountLevelThree = [];
    this.accountTypeId = id;
    this.CrudService.read('account-types/level-one?account_type=' + id).subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountLevelOne = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountLLevelTwo() {
    this.applicationForm.get('level_two')?.reset();
    this.applicationForm.get('level_three')?.reset();
    this.accountLevelThree = [];
    console.log("Account LEvel Two is called: ",);
    this.CrudService.read(`account-types/level-two?level_one=${this.accountTypeId}`).subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountLevelTwo = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }


  getAccountLLevelThree() {
    this.applicationForm.get('level_three')?.reset();
    this.CrudService.read(`account-types/level-three?level-two=${this.accountTypeId}`).subscribe(response => {
      if (response.data?.status_code == 201) {
        this.accountLevelThree = response.data?.data?.payload;
      }
    }, error => {
      console.log("Error while frtcing account types: ", error.message);
    })
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substr(0, maxLength) + '...' : text;
  }




  onSubmit() {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }
    this.applicationForm.removeControl('account_level');
    const filterFormData = Object.fromEntries(
      Object.entries(this.applicationForm.value)
        .filter(([key, value]) => value !== null && value !== '')
    );
    filterFormData['business'] = this.locaStorage.getItem('user')?.business;
    console.log("Form data: ", filterFormData);

    if (this.isUpdateMode) {
      this.CrudService.update('charts-of-accounts', this.dataForUpdate?._id, filterFormData).subscribe(response => {
        if (response.data?.status_code == 201 || response.data?.status_code == 200) {
          this.toastService.success("Chart Of Account Updated.", 'Success')
          this.closeModal(true);
        }
      }, error => {
        this.toastService.error(error.message, "Error !");
      })
    } else {
      this.CrudService.create('charts-of-accounts', filterFormData).subscribe(response => {
        if (response.data?.status_code == 201 || response.data?.status_code == 200) {
          this.toastService.success("Chart Of Account Added.", 'Success')
          this.closeModal(true);
        }
      }, error => {
        this.toastService.error(error.message, "Error !");
      })
    }
  }
}