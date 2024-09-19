import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-General',
  templateUrl: './General.component.html',
  styleUrls: ['./General.component.scss', '../../../css/custpm-dropdown-style.scss', '../../../css/custom-datepicker-style.scss']
})
export class GeneralComponent implements OnInit {

isSwitchChecked: boolean = false;
isCloseBooked: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  openDatepicker() {

  }

}
