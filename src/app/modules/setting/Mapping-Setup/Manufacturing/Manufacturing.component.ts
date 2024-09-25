import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CrudService } from 'src/app/shared/services/crud.service';
@Component({
  selector: 'app-Manufacturing',
  templateUrl: './Manufacturing.component.html',
  styleUrls: ['./Manufacturing.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class ManufacturingComponent implements OnInit {
  accounts: Array<{ type: string; enable: boolean; payment_account: string; deposite_account: string }> = [];
  update: boolean = false;
  user: any;
  accountTypes: { type: string; key: string }[] = [
    // { type: 'Manufacture Order', key: 'manufacture_Order' },
    { type: 'Material Cost', key: 'material_cost' },
    { type: 'Labour Cost', key: 'labour_cost' }
  ];
  setting: any;
  bankingData: any;

  constructor(
    private LocalStoreService: LocalStoreService, 
    private toastr: ToastrService,
    private CrudService : CrudService
  ) { }

  ngOnInit(): void {
    this.initializeAccounts();
    this.forBussinessId();
    this.fetchSetting();
    this.fetchBankingData();
  }

  initializeAccounts() {
    this.accounts = this.accountTypes.map(({ type }) => ({
      type,
      enable: false,
      payment_account: '',
      deposite_account: '',
    }));
  }

  toggleAccount(index: number) {
    const account = this.accounts[index];
    if (!account.enable) {
      account.payment_account = ''; // Reset if unchecked
      account.deposite_account = '';  // Reset if unchecked
    }
  }

  forBussinessId() {
    this.user = this.LocalStoreService.getItem('user');
  }

  submitForm() {
    // Initializing the data object based on the desired format
    const data: { [key: string]: any } = {
      manufacture_Order: false, // Default as false
      material_cost: {},
      labour_cost: {},
      business: this.user.business
    };
    this.accounts.forEach(account => {
      if (account.payment_account || account.deposite_account) {
      if (account.enable) {
        const mapping = this.accountTypes.find(type => type.type === account.type);
        if (mapping) {
          const key = mapping.key;
          // If account is enabled, set it to true and assign payment/deposit accounts
          if (key === 'manufacture_Order') {
            data['manufacture_Order'] = true;
          } else {
            data[key] = {
              payment_account: account.payment_account,
              deposite_account: account.deposite_account
            };
          }
        }
      }
    }
    });
console.log("data",data)
    // Send the data to the backend
    this.CrudService.create('manufacture/create-update',data).subscribe(
      response => {
        console.log('Response:', response);
        this.toastr.success(
          this.update ? 'Settings updated successfully' : 'Settings saved successfully',
          'Success'
        );
        this.fetchSetting();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  fetchSetting() {
    this.CrudService.read('manufacture/business',this.user?.business).subscribe(
      (response: any) => {
        if (response?.data?.data) {
          this.setting = response.data.data;
          this.update = true;
  
          // Iterate through the accounts and update payment accounts
          this.accounts.forEach(account => {
            const mapping = this.accountTypes.find(type => type.type === account.type);
            if (mapping) {
              // Update payment account based on the new response structure
              const paymentAccountData = this.setting[mapping.key]?.payment_account;
  
              if (paymentAccountData) {
                account.payment_account = paymentAccountData._id; // Set account ID
                // account.payment_account = paymentAccountData.name; // Optional: Save the name if needed
              } else {
                account.payment_account = ''; // Reset if not found
              }
  
              // Assuming you might have a similar structure for deposit_account
              const depositAccountData = this.setting[mapping.key]?.deposite_account;
              if (depositAccountData) {
                account.deposite_account = depositAccountData._id; // Set account ID
                // account.deposite_account = depositAccountData.name; // Optional: Save the name if needed
              } else {
                account.deposite_account = ''; // Reset if not found
              }
  
              // Enable logic
              account.enable = account.payment_account !== '' || account.deposite_account !== '';
            }
          });
          // console.log("this.accounts", this.accounts);
        } else {
          console.error('Unexpected response format', response);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
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
