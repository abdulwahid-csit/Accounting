import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-payment-mode-mapping',
  templateUrl: './payment-mode-mapping.component.html',
  styleUrls: ['./payment-mode-mapping.component.scss']
})
export class PaymentModeMappingComponent {
  settingForm!: FormGroup;
  bankingData: any;
  constructor(private modalService: BsModalService,private fb: FormBuilder,private CrudService: CrudService) { }

  ngOnInit() {
    this.initForm()
    this.fetchBankingData();
  }
  initForm() {
    const validation = {
      // item:[null,Validators.compose([Validators.required])],
      item:[""],
      business:[""],
      inventory_asset_account:[""],
      income_account:[""],
      expense_account:[""],
    };
    this.settingForm = this.fb.group(validation);
  }
  close(){
    this.modalService.hide();
  }
  fetchBankingData(page: number = 1) {
    this.CrudService.read('banking').subscribe(
      (response: any) => {
        if (response?.data?.data?.payload) {
          // Extracting the payload
          this.bankingData = response.data.data.payload.map((item: any) => {
            return {
              _id: item._id,
              name: item.name, // Use account name
              account_number: item.account_number // Optional: Add account number if needed
            };
          });
        } else {
          console.error('Unexpected response format', response);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
