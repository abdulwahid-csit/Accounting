import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Mapping-Setup',
  templateUrl: './Mapping-Setup.component.html',
  styleUrls: ['./Mapping-Setup.component.scss']
})
export class MappingSetupComponent implements OnInit {

  isActive = true;
  isDisabled = false;


  constructor() { }

  ngOnInit() {
  }
  activeTab: string = 'General';

  setActiveTab(tab: string) {
  }

  changeActiveMenue(arg:any) {
    this.activeTab = arg;

    }
}
