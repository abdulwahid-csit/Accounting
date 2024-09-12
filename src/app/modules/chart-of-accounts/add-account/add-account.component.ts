import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  applicationForm!: FormGroup;
  isFocused: boolean = false;
  isInvoiceFocused = false;
  isPaymentmodeFocused = false;
  isStatusFocused = false;
  editorContent = ''
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

  constructor(private modalService: BsModalService) { }

  ngOnInit() {

    this.applicationForm = new FormGroup({
      organization: new FormControl('', [Validators.required]),
    })
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


  onSelectFoucus() {
    console.log("NG slect focused");
    this.isFocused = true;
  }

  onNgSelectBlur() {
    this.isFocused = false;
    console.log("Ng select blured.")
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
}