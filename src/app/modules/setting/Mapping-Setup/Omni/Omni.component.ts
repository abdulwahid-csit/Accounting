import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Omni',
  templateUrl: './Omni.component.html',
  styleUrls: ['./Omni.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class OmniComponent implements OnInit {
isSalesChecked: any;
isExpensesChecked: any;

  constructor() { }

  ngOnInit() {
  }

}
