import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CrudService } from 'src/app/shared/services/crud.service';
@Component({
  selector: 'app-Purchase',
  templateUrl: './Purchase.component.html',
  styleUrls: ['./Purchase.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class PurchaseComponent implements OnInit {
  accounts: Array<{
    type: string;
    key: string;
    enable: boolean;
    payment_account: string;
    deposite_account: string;
  }> = [];

  accountTypes = [
    { type: 'Purchase Order', key: 'purchase_order_accounts' },
    { type: 'Purchase Invoice', key: 'purchase_invoice_accounts' },
    { type: 'Payment', key: 'payment_accounts' },
    { type: 'Purchase Order Return', key: 'purchase_order_return_accounts' },
    { type: 'Refund', key: 'refund_accounts' },
  ];

  user: any;
  setting: any;
  update = false;
  bankingData: any;

  constructor(
    private localStoreService: LocalStoreService,
    private toastr: ToastrService,
    private CrudService:CrudService
  ) {}

  ngOnInit(): void {
    this.initializeAccounts();
    this.getUserData();
    this.fetchSetting();
    this.fetchBankingData();
  }

  initializeAccounts() {
    this.accounts = this.accountTypes.map(({ type, key }) => ({
      type,
      key,
      enable: false,
      payment_account: '',
      deposite_account: ''
    }));
  }

  toggleAccount(index: number) {
    const account = this.accounts[index];
    if (!account.enable) {
      account.payment_account = ''; // Reset when disabled
      account.deposite_account = ''; // Reset when disabled
    }
  }

  getUserData() {
    this.user = this.localStoreService.getItem('user');
  }

  submitForm() {
    const data: { [key: string]: any } = {
      business: this.user.business,
      tax_default: true,
    };

    this.accounts.forEach(account => {
      if (account.payment_account || account.deposite_account) {
      if (account.enable) {
        data[account.key] = {
          payment_account: account.payment_account,
          deposite_to: account.deposite_account
        };
        data[account.key.replace('_accounts', '')] = true;
      }
    }
    });

    this.CrudService.create('purchase/create-update',data).subscribe(
      response => {
        this.toastr.success(
          this.update ? 'Settings updated successfully' : 'Settings saved successfully',
          'Success'
        );
        this.fetchSetting();
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('Failed to save settings', 'Error');
      }
    );
  }
  fetchSetting() {
    this.CrudService.read('purchase',this.user?.business).subscribe(
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
