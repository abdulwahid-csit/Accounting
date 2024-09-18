import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manufacturing',
  templateUrl: './manufacturing.component.html',
  styleUrls: ['./manufacturing.component.scss', '../../../../../css/custpm-dropdown-style.scss']
})
export class ManufacturingComponent implements OnInit {

  applicationForm!: FormGroup;
  isFocused: boolean = false;
  isProductFocus = false;
  isRoutingFocus = false;
  isStatusFocus = false;

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
