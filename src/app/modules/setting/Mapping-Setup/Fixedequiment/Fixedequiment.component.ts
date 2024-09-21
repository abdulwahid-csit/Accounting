import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Fixedequiment',
  templateUrl: './Fixedequiment.component.html',
  styleUrls: ['./Fixedequiment.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class FixedequimentComponent implements OnInit {
isPurchasOrderChecked: any;
isPurchaseInovoiceChecked: any;
isPaymentChecked: any;
isPurchaseOrderReturnChecked: any;
isRefundChecked: any;
isTaxDefaultChecked: any;


  constructor() { }

  ngOnInit() {
  }

}
