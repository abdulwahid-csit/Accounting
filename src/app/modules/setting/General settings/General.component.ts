import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-General',
  templateUrl: './General.component.html',
  styleUrls: ['./General.component.css']
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
