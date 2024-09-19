import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-payment-tax-mapping',
  templateUrl: './payment-tax-mapping.component.html',
  styleUrls: ['./payment-tax-mapping.component.scss']
})
export class PaymentTaxMappingComponent {

  constructor(private modelservice:BsModalService){
  }
  close(){
    this.modelservice.hide();
  }
}
