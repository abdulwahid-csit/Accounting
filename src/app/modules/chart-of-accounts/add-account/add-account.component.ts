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
  selectedAccountLevel: number = 1;
  accountTypes: any;
  accountDetailsTypes: any;
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
    this.getAccountType();
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
      account_level: new FormControl(1),
      account_type: new FormControl(null, [Validators.required]),
      level_one: new FormControl(null),
      level_two: new FormControl(null),
      level_three: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    })

  }
  getAccountType() {
    this.CrudService.read('meta-data/account-type').subscribe(response => {
      if (response.data?.status_code === 200) {
        this.accountTypes = response.data?.data;
        console.log("Data: ", this.accountTypes)
      } else {
        console.log("Error response: ", response);
      }
    })
  }


  getAccountDetailsType(selectedAccountType: any): void {
    const accountTypeName = selectedAccountType;
    console.log('Selected Account Type Name:', accountTypeName);
    this.CrudService.read('meta-data/account-detail-type').subscribe(response => {
      if (response.data?.status_code === 200) {
        this.accountDetailsTypes = response.data?.data;
        console.log("Account details types: ", this.accountDetailsTypes);
      } else {
        console.log("Error: ", response);
      }
    })
  }



  setAccountFieldsVisibility(value: number) {
    this.selectedAccountLevel = value;
    this.applicationForm.markAsUntouched();
    if (value == 2) {
      this.applicationForm?.get('account_detail_type')?.setValidators(Validators.required);
      this.applicationForm?.get('parrent_account')?.setValidators(Validators.required);
    }
    else if (value == 3) {
      this.applicationForm?.get('account_detail_type')?.setValidators(Validators.required);
      this.applicationForm?.get('account_sub_detail_type')?.setValidators(Validators.required);
      this.applicationForm?.get('parrent_account')?.setValidators(Validators.required);
    }
    else {
      this.applicationForm?.get('account_detail_type')?.clearValidators();
      this.applicationForm?.get('account_sub_detail_type')?.clearValidators();
      this.applicationForm?.get('parrent_account')?.clearValidators();
    }

    this.applicationForm?.get('account_detail_type')?.updateValueAndValidity();
    this.applicationForm?.get('account_sub_detail_type')?.updateValueAndValidity();
    this.applicationForm?.get('parrent_account')?.updateValueAndValidity();
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

    this.CrudService.create('charts-of-accounts', filterFormData).subscribe(response => {
      if (response.data?.status_code == 201) {
        this.toastService.success("Charts Of Account Added.", 'Success')
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