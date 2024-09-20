import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
openDatepicker() {

}
selectAllSubAccounts() {

}
deselectAllSubAccounts() {

}
deselectAll() {

}
selectAll() {

}

filterAccounts() {

}
  SearchItems: any;
  applicationForm!: FormGroup;
  isFocused: boolean = false;
  isStatusFocus = false;
  isFromDateFocus = false;
  isToDateFocus = false;
  activeTab = 'payment';
  selectedSubAccounts: any;
  subAccounts: readonly any[] | null | undefined;
  selectedAccounts: any;
 filteredAccounts: readonly any[] | null | undefined;

  constructor() { }

  ngOnInit() {
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

}
