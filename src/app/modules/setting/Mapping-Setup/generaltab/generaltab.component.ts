import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generaltab',
  templateUrl: './generaltab.component.html',
  styleUrls: ['./generaltab.component.css']
})
export class GeneraltabComponent implements OnInit {
isSwitchChecked: boolean = false;
isPaymentChecked:boolean = false;
isExpensesChecked:boolean = false;
isRefundChecked:boolean = false;
isSalesChecked:boolean = false;
isTaxChecked:boolean = false;
isExpenseChecked:boolean = false;


  constructor() { }

  ngOnInit() {
  }

}
