import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../setting.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { BankingService } from 'src/app/modules/banking/banking.service';

@Component({
  selector: 'app-Inventory',
  templateUrl: './Inventory.component.html',
  styleUrls: ['./Inventory.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class InventoryComponent implements OnInit {
  accounts: Array<{
    type: string;
    key: string;
    enable: boolean;
    payment_account: string;
    deposite_account: string;
  }> = [];

  accountTypes = [
    { type: 'Receiving Voucher', key: 'receiving_voucher_accounts' },
    { type: 'Return Order Voucher', key: 'return_order_voucher_accounts' },
    { type: 'Inventory', key: 'inventory_accounts' },
    { type: 'Profit', key: 'profit_accunts' }, // Profit accounts spelling seems inconsistent, corrected as per the format provided
    { type: 'Loss and Adjustment', key: 'increase_accounts' },
    { type: 'Open Stock', key: 'open_stock_accounts' }
  ];

  user: any;
  setting: any;
  update = false;
  bankingData: any;

  constructor(
    private localStoreService: LocalStoreService,
    private settingService: SettingService,
    private toastr: ToastrService,
    private bankinService: BankingService
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
      // tax_default: true,
    };

    this.accounts.forEach(account => {
      if (account.enable) {
        data[account.key] = {
          payment_account: account.payment_account,
          deposite_to: account.deposite_account
        };
        const correspondingFlagKey = account.key.replace('_accounts', ''); // Creates key like "receiving_voucher"
        data[correspondingFlagKey] = true;
      }
    });

    this.settingService.createSettingsInventory(data).subscribe(
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
    this.settingService.getSettingsInventory(this.user?.business).subscribe(
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
    this.bankinService.getBankResource().subscribe(
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
