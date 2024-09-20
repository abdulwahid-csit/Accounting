import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-payment-mode-mapping',
  templateUrl: './payment-mode-mapping.component.html',
  styleUrls: ['./payment-mode-mapping.component.scss']
})
export class PaymentModeMappingComponent {
  constructor(private modelservice:BsModalService){

  }
  close(){
    this.modelservice.hide();
  }
}
