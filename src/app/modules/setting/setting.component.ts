import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  selectedView: string = 'general';

  showBankAccounts() {
    this.selectedView = 'general';
  }

  showBankFeeds() {
    this.selectedView = 'bankFeeds';
  }
}
