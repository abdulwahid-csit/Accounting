import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss', '../../../css/custpm-dropdown-style.scss', '../../../css/custom-datepicker-style.scss']
})
export class AddAccountComponent implements OnInit, OnDestroy {

  applicationForm!: FormGroup;
  isAccountFocus = false;
  isParrentAccountFocus = false;
  isTypeFoucus = false;
  isDetailTypeFocus = false;
  isStatusFocus = false;
  isQuillFocus = false;
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
  @ViewChild('printSection', { static: false }) printSection!: ElementRef;


  editorConfig = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      [{ 'direction': 'rtl' }],
    ]
  };

  constructor(private modalService: BsModalService, private CrudService: CrudService, private toastService: ToastrService, private locaStorage: LocalStoreService) { }

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


  closeModal(): void {
    this.modalService.hide();
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.isQuillFocus && event.ctrlKey && event.key === 'p') {
      event.preventDefault();
      this.printDocument();
    }
  }

  printDocument() {
    if (this.printSection) {
      this.printSection.nativeElement.innerHTML = this.editorContent;
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'absolute';
      printFrame.style.width = '0px';
      printFrame.style.height = '0px';
      printFrame.style.border = 'none';
      document.body.appendChild(printFrame);
      const printDoc = printFrame.contentWindow?.document;
      if (printDoc) {
        printDoc.open();
        printDoc.write(`
          <html>
          <head>
            <title>Chart of Accounts</title>
            <style>
            </style>
          </head>
          <body>
            ${this.applicationForm.get('description')?.value}
          </body>
          </html>
        `);
        printDoc.close();
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
        document.body.removeChild(printFrame);
      }
    }

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

  }

  setAccountFieldsVisibility(value: string) {
    this.selectedAccountLevel = value;
    this.applicationForm.markAsUntouched();
    if (value == '2') {
      this.applicationForm?.get('level_one')?.setValidators(Validators.required);
      this.applicationForm?.get('level_two')?.setValidators(Validators.required);
    }
    else if (value == '3') {
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
    this.CrudService.read(`account-types/level-three?level-twe=${this.accountTypeId}`).subscribe(response => {
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
    const descriptionControl = this.applicationForm.controls['description'];
    const formattedDescription = descriptionControl.value.replace(/<\/?p>/g, '');
    descriptionControl.setValue(formattedDescription);
    const filterFormData = Object.fromEntries(
      Object.entries(this.applicationForm.value)
        .filter(([key, value]) => value !== null && value !== '')
    );
    filterFormData['business'] = this.locaStorage.getItem('user')?.business;
    console.log("Form data: ", filterFormData);

    this.CrudService.create('charts-of-accounts', filterFormData).subscribe(response => {
      if (response.data?.status_code == 201) {
        this.toastService.success("Chart Of Account Added.", 'Success')
        this.closeModal();
      }
    }, error => {
      this.toastService.error(error.message, "Error !");
    })

  }

  ngOnDestroy(): void {
    this.isQuillFocus = false;
  }
}