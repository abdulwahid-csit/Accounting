import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { BankingService } from '../banking.service';

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
  parentsType: any;
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

  constructor(private modalService: BsModalService,private fb: FormBuilder,  private http:HttpClient,
    private bankinService:BankingService
  ) { }

  ngOnInit() {

    // this.applicationForm = new FormGroup({
    //   organization: new FormControl('', [Validators.required]),
    // })
    this.initForm();
    this.fetchBankingData();
  }
  initForm() {
    const validation = {
      opening_date:[this.date],
      banking_name:[null,Validators.compose([Validators.required])],
      branch_name:[null],
      account_nature:[null,Validators.compose([Validators.required])],
      title_of_account:[null],
      account_no:[null,Validators.compose([Validators.required])],
      iban_no:[null],
      opening_balance:[null],
      bank_account:[null],
      bank_routing:[null],
      address:[null],
      description:[null]
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
  const postData = this.applicationForm.value
  this.bankinService.createBankingResource(postData).subscribe(
    response => {
      console.log('Response:', response);
    },
    error => {
      console.error('Error:', error);
    }
  );
}

fetchBankingData() {
  this.bankinService.getBankingResource().subscribe(
    data => {
      console.log('Banking Data:', data);
      this.bankingData = data;
    },
    error => {
      console.error('Error:', error);
    }
  );
}

  ngOnDestroy(): void {
    this.isQuillFocus = false;
  }
}