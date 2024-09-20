import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Payslips',
  templateUrl: './Payslips.component.html',
  styleUrls: ['./Payslips.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class PayslipsComponent implements OnInit {
isExpenseChecked: any;
isExpensesChecked: any;
isPaymentChecked: any;
isSalesChecked: any;
isRefundChecked: any;

  constructor() { }

  ngOnInit() {
  }

}
