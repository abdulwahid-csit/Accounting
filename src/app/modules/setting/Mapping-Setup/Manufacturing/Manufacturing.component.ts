import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Manufacturing',
  templateUrl: './Manufacturing.component.html',
  styleUrls: ['./Manufacturing.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class ManufacturingComponent implements OnInit {
isPaymentChecked: any;
isExpensesChecked: any;

  constructor() { }

  ngOnInit() {
  }

}
