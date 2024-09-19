import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-expense-category-mapping',
  templateUrl: './expense-category-mapping.component.html',
  styleUrls: ['./expense-category-mapping.component.scss']
})
export class ExpenseCategoryMappingComponent {


  constructor(private modelservice:BsModalService){}
  
  close(){
    this.modelservice.hide();
  }
}
