import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss', '../../../../../css/custpm-dropdown-style.scss', '../../../../../css/custom-datepicker-style.scss']
})
export class SalesComponent implements OnInit {
  applicationForm!: FormGroup;
  isFocused: boolean = false;
  isInvoiceFocus = false;
  isPaymentmodeFocus = false;
  isStatusFocus = false;
  isFromdateFocus = false;
  isToDateFocus = false;
  activeTab = 'payment';
  
  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective | any;

  constructor() { }

  ngOnInit() {

    this.applicationForm = new FormGroup({
      organization: new FormControl('', [Validators.required]),
    })
  }

  changeActiveMenue(tab: string){
    this.activeTab = tab;
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

  openDatepicker() {
    this.datepicker?.show();
  }

}
