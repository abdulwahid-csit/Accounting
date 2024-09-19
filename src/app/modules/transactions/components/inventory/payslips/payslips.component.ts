import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.scss', '../../../../../css/custpm-dropdown-style.scss', '../../../../../css/custom-datepicker-style.scss']
})
export class PayslipsComponent implements OnInit {

  applicationForm!: FormGroup;
  isFocused: boolean = false;
  isStatus= false;
  isFromDate = false;
  isToDate = false;

  constructor() { }

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


}
