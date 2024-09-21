import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Purchase',
  templateUrl: './Purchase.component.html',
  styleUrls: ['./Purchase.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class PurchaseComponent implements OnInit {
isExpensesChecked: any;
isPusrchaseChecked: any;
isPaymentChecked:any;
isSalesChecked: any;
isExpenseChecked: any;
isTaxChecked:any;
isInvoiceChecked:any;
  constructor() { }

  ngOnInit() {
  }

}
