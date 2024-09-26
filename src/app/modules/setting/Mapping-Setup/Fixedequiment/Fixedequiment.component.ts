import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-Fixedequiment',
  templateUrl: './Fixedequiment.component.html',
  styleUrls: ['./Fixedequiment.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class FixedequimentComponent implements OnInit {
  accounts: Array<{
    type: string;
    key: string;
    enable: boolean;
    payment_account: any;
    deposite_account: any;
  }> = [];

  accountTypes = [
    { type: 'Asset', key: 'asset_accounts' },
    { type: 'License', key: 'license_accounts' },
    { type: 'Component', key: 'component_accounts' },
    { type: 'Consumables', key: 'sonsumables_accounts' },
    { type: 'Maintenance', key: 'maintenance_accounts' },
    { type: 'Depreciation', key: 'depreciation_accounts' }
  ];

  user: any;
  setting: any;
  update = false;
  bankingData: any;

  constructor(
    private localStoreService: LocalStoreService,
    private toastr: ToastrService,
    private CrudService: CrudService
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
      payment_account: null,
      deposite_account: null
    }));
  }

  toggleAccount(index: number) {
    const account = this.accounts[index];
    if (!account.enable) {
      account.payment_account = null; // Reset when disabled
      account.deposite_account = null; // Reset when disabled
    }
  }

  getUserData() {
    this.user = this.localStoreService.getItem('user');
  }

  submitForm() {
    const data: { [key: string]: any } = {
      business: this.user.business,
    };

    this.accounts.forEach(account => {
      if (account.enable) {
        const accountKey = account.key.replace('_accounts', ''); // Creates key like "asset" from "asset_accounts"
        data[accountKey] = true; // Set the flag to true
        data[account.key] = {
          payment_account: account.payment_account,
          deposite_to: account.deposite_account
        };
      }else{
        const accountKey = account.key.replace('_accounts', '');
        // data[accountKey] = false;
        data[account.key] = {
        };
      }
    });

    this.CrudService.create('fixed-equipment/create-update', data).subscribe(
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
    this.CrudService.read('fixed-equipment/by-business', this.user?.business).subscribe(
      (response: any) => {
        if (response?.data?.data) {
          this.setting = response.data.data;
          this.update = true;
          this.accounts.forEach(account => {
            const mapping = this.accountTypes.find(type => type.type === account.type);
            if (mapping) {
              const paymentAccountData = this.setting[mapping.key]?.payment_account || null;
              if (paymentAccountData && paymentAccountData._id) {
                account.payment_account = paymentAccountData._id; // Set account ID
              } else {
                account.payment_account = null; // Reset if not found
              }
              const depositAccountData = this.setting[mapping.key]?.deposite_to || null;
              if (depositAccountData && depositAccountData._id) {
                account.deposite_account = depositAccountData._id; // Set account ID
              } else {
                account.deposite_account = null; // Reset if not found
              }
              // Enable logic should check for non-null values
              account.enable = !!account.payment_account || !!account.deposite_account;
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
