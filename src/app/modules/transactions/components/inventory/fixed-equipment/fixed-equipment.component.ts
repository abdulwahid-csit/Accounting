import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fixed-equipment',
  templateUrl: './fixed-equipment.component.html',
  styleUrls: ['./fixed-equipment.component.scss', '../../../../../css/custpm-dropdown-style.scss', '../../../../../css/custom-datepicker-style.scss']
})
export class FixedEquipmentComponent implements OnInit {

  applicationForm!: FormGroup;
  isFocused: boolean = false;
  isFromDateFocus = false;
  isToDateFocus = false;
  isStatusFocus = false;
  activeTab = 'payment';

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

}
