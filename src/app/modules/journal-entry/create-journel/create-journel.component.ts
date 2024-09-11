import { Component } from '@angular/core';

@Component({
  selector: 'app-create-journel',
  templateUrl: './create-journel.component.html',
  styleUrls: ['./create-journel.component.scss']
})
export class CreateJournelComponent {

  accounts = [
    { id: 1, name: 'No', },
    { id: 2, name: 'Every 1 month', },
    { id: 3, name: 'Every 2 month', },
    { id: 4, name: 'Every 3 montht', },
    { id: 5, name: 'Every 4 monthe', },
    { id: 6, name: 'Every 5 month', },
    { id: 7, name: 'Every 6 months',  },
   
  ];

  filteredAccounts = [...this.accounts];
  selectedAccounts: number[] = [];

}
