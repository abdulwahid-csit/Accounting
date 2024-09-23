import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { BankingService } from '../banking.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss', '../../../css/custom-datepicker-style.scss', '../../../css/custpm-dropdown-style.scss']
})
export class AddBankComponent implements OnInit {
  applicationForm!: FormGroup;
  isAccountFocus = false;
  isParrentAccountFocus = false;
  isTypeFoucus = false;
  isDetailTypeFocus = false;
  isStatusFocus = false;
  isQuillFocus = false;
  editorContent = '';
  date = new Date();
  @ViewChild('printSection', { static: false }) printSection!: ElementRef;
  AccountsType: any;
  detailsType: any;
  user: any;
  @Output() successCall = new EventEmitter<void>();
  @Input() data: any;
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
  bankingData: any;
  isUpdateMode: boolean = false
  constructor(private modalService: BsModalService,private fb: FormBuilder,  private http:HttpClient,
    private bankinService:BankingService, private LocalStoreService: LocalStoreService , private toastr: ToastrService
  ) { }

  ngOnInit() {

    // this.applicationForm = new FormGroup({
    //   organization: new FormControl('', [Validators.required]),
    // })
    this.initForm();
    this.fetchBankingData();
    this.forBussinessId();
    console.log("update",this.data)
    if(this.data){
      this.isUpdateMode = true
      this.fillFormData();
    }

  }
  initForm() {
    const validation = {
      opening_Date:[this.date,Validators.compose([Validators.required])],
      name:[null,Validators.compose([Validators.required])],
      branch_name:[null,Validators.compose([Validators.required])],
      account_natures:[null,Validators.compose([Validators.required])],
      account_number:[null,Validators.compose([Validators.required])],
      iban_number:[null,Validators.compose([Validators.required])],
      balance:[null],
      business:[""],
      bank:[null,Validators.compose([Validators.required])],
    };
    this.applicationForm = this.fb.group(validation);
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

  forBussinessId(){
    this.user = this.LocalStoreService.getItem('user');
  }

  isDropdownOpen = false;
  isSubDropdownOpen = false;

  toggleDropdown(isOpen: boolean) {
    this.isDropdownOpen = isOpen;
  }

  toggleSubDropdown(isOpen: boolean) {
    this.isSubDropdownOpen = isOpen;
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
            ${this.printSection.nativeElement.innerHTML}
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
submitForm() {
  if(this.applicationForm?.invalid){
    this.applicationForm?.markAllAsTouched();
  return
  }
  const postData = this.applicationForm.value
  postData['business'] = this.user.business
  if(postData['balance'] == null){
    postData['balance'] = 0
  }
  this.bankinService.createBankingResource(postData).subscribe(
    response => {
      console.log('Response:', response);
      this.closeModal();
      this.successCall.emit();
    },
    error => {
      console.error('Error:', error);
    }
  );
}

fetchBankingData() {
  this.bankinService.getBankingResource().subscribe(
    (response: any) => {
      if (response?.data?.data?.payload) {
        this.bankingData = response.data.data.payload;
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

  ngOnDestroy(): void {
    this.isQuillFocus = false;
  }
  fillFormData() {
    console.log("data for update",this.data)
    if (this.data) {
      this.applicationForm.patchValue({
        opening_Date: this.data.opening_Date || this.date,  // Use this.date as fallback
        name: this.data.name || null,
        branch_name: this.data.branch_name || null,
        account_natures: this.data.account_natures || null,
        account_number: this.data.account_number || null,
        iban_number: this.data.iban_number || null,
        balance: this.data.balance || null,
        bank: this.data.bank._id || null,
        business: this.data.business || this.user.business
      });
    }
  }

  updateForm() {
    const postData = this.applicationForm.value
    postData['business'] = this.user.business
    if(postData['balance'] == null){
      postData['balance'] = 0
    }
    this.bankinService.editBankingResource(this.data?._id,postData).subscribe(
      response => {
        console.log('Response:', response);
        this.closeModal();
        this.successCall.emit();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.applicationForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched) ? true : false;
  }
  
  
}