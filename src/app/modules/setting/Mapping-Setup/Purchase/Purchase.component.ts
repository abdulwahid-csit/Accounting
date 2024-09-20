import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Purchase',
  templateUrl: './Purchase.component.html',
  styleUrls: ['./Purchase.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class PurchaseComponent implements OnInit {
isExpensesChecked: any;
isSalesChecked: any;
isExpenseChecked: any;

  constructor() { }

  ngOnInit() {
  }

}
