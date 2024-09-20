import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

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
  editorContent = ''
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

  constructor(private modalService: BsModalService, private CrudService: CrudService) { }

  ngOnInit() {

    this.applicationForm = new FormGroup({
      organization: new FormControl('', [Validators.required]),
    })

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



  getAccountType(){
    this.CrudService.read('meta-data/account-type').subscribe(response => {
      if(response.data?.status_code === 200){
        this.accountTypes = response.data?.data;
        console.log("Data: ", this.accountTypes)
      }else{
        console.log("Error response: ", response);
      }
    })
  }


  getAccountDetailsType(selectedAccountType: any): void {
    const accountTypeName = selectedAccountType.title;
    console.log('Selected Account Type Name:', accountTypeName);
    this.CrudService.read('meta-data/account-detail-type').subscribe(response => {
      if(response.data?.status_code === 200){
        this.accountDetailsTypes = response.data?.data;
        console.log("Account details types: ", this.accountDetailsTypes);
      }else{
        console.log("Error: ", response);
      }
    })}


  ngOnDestroy(): void {
    this.isQuillFocus = false;
  }
}