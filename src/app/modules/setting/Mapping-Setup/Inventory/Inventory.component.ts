import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Inventory',
  templateUrl: './Inventory.component.html',
  styleUrls: ['./Inventory.component.css']
})
export class InventoryComponent implements OnInit {
isExpensesChecked: boolean = false;
isSalesChecked:  boolean = false;
isRefundChecked: any;
isPaymentChecked: any;

  constructor() { }

  ngOnInit() {
  }

}
