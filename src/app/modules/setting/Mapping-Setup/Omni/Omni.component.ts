import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CrudService } from 'src/app/shared/services/crud.service';
@Component({
  selector: 'app-Omni',
  templateUrl: './Omni.component.html',
  styleUrls: ['./Omni.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class OmniComponent implements OnInit {
  accounts: Array<{
    type: string;
    key: string;
    enable: boolean;
    payment_account: string;
    deposite_account: string;
  }> = [];

  accountTypes = [
    { type: 'Order Return', key: 'order_return' },
    { type: 'Refund', key: 'refund' }
  ];

  user: any;
  setting: any;
  update = false;
  bankingData: any;

  constructor(
    private localStoreService: LocalStoreService,
    private toastr: ToastrService,
    private CrudService :CrudService
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
      account.payment_account = ''; 
      account.deposite_account = ''; 
    }
  }

  getUserData() {
    this.user = this.localStoreService.getItem('user');
  }

  submitForm() {
    const data: { [key: string]: any } = {
      business: this.user?.business, 
      order_return: {
        order_return: false,
        payment_account: null,
        deposite_account: null
      },
      refund: {
        refund: false, 
        payment_account: null,
        deposite_account: null
      }
    };
      this.accounts.forEach(account => {
      if (account.enable) {
        if (account.key === 'order_return') {
          data['order_return'] = {
            order_return: true,
            payment_account: account.payment_account,
            deposite_account: account.deposite_account
          };
        } else if (account.key === 'refund') {
          data['refund'] = {
            refund: true,
            payment_account: account.payment_account,
            deposite_account: account.deposite_account
          };
        }
      }
    });
      this.CrudService.create('omni-sales/create-update', data).subscribe(
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
    this.CrudService.read('omni-sales/business', this.user?.business).subscribe(
      (response: any) => {
        if (response?.data?.data) {
          this.setting = response.data.data;
          this.update = true;
            this.accounts.forEach(account => {
            const mapping = this.accountTypes.find(type => type.type === account.type);
            if (mapping) {
              const settingData = this.setting[mapping.key];
              if (settingData) {
                const paymentAccountData = settingData.payment_account;
                if (paymentAccountData) {
                  account.payment_account = paymentAccountData._id; 
                } else {
                  account.payment_account = ''; 
                }
                  const depositAccountData = settingData.deposite_account;
                if (depositAccountData) {
                  account.deposite_account = depositAccountData._id; 
                } else {
                  account.deposite_account = '';
                }
                  account.enable = !!account.payment_account || !!account.deposite_account;
              } else {
                account.payment_account = '';
                account.deposite_account = '';
                account.enable = false;
              }
            }
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
