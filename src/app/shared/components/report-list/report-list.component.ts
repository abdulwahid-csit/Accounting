import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExportService } from '../../services/export.service';
import { BalanceSheetComponent } from 'src/app/modules/reports/BalanceSheet/BalanceSheet.component';
import { GeneralLedgerComponent } from 'src/app/modules/reports/General Leisure/GeneralLedger.component';
import { ReportDataService } from '../../services/reports-data.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  @Input() isAccountsVisible = false;
  @Input() isFormdateVisible = false;
  @Input() isTodateVisible = false;
  @Input() isitemVisible = false;
  @Input() isDetailVisible = false;
  @Input() isDisplayByColumns = false;
  @Input() isDisplayByRows= false;
  @Input() isBudget= false;


  @Input() isCityVisible = false;
  @Input() isPostalCodeVisible = false;

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
  receivedData: any;



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

constructor(private reportDataService: ReportDataService, private exportService: ExportService) {}

// // Function to get the current report data

  ngOnInit() {
    this.reportDataService.reportData$.subscribe((data) => {
      if (data) {
        this.receivedData = data;
        console.log('Received Data:', this.receivedData);
      }
    });
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

  exportPDF() {
    if (this.receivedData) {
        this.exportService.exportToPDF(this.receivedData);
    } else {
        console.error("No data available for export");
    }
}


  exportExcel() {
    if (this.receivedData) {
      this.exportService.exportToExcel(this.receivedData);
  } else {
      console.error("No data available for export");
  }
  }

}
