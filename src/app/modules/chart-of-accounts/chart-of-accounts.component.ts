import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddAccountComponent } from './add-account/add-account.component';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss']
})
export class ChartOfAccountsComponent implements OnInit {

 
  applicationForm!: FormGroup;
  isFocused: boolean = false;
  isInvoiceFocused = false;
  isPaymentmodeFocused = false;
  isStatusFocused = false;

  constructor(
    private modalService: BsModalService
  ) { }

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


  addAccount(){
    this.modalService.show(AddAccountComponent, {
      class: 'modal-dialog modal-dialog-centered modal-xl create_organization',
      backdrop: 'static',
      keyboard: true,
    });
  }

}
