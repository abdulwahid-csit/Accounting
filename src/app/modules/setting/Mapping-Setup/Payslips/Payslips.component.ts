import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../setting.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { BankingService } from 'src/app/modules/banking/banking.service';
@Component({
  selector: 'app-Payslips',
  templateUrl: './Payslips.component.html',
  styleUrls: ['./Payslips.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class PayslipsComponent implements OnInit {
  settingForm! : FormGroup
  user: any;
  accounts: Array<{ type: string; enable: boolean; payment_account: string; deposite_account: string }> = [];
  update : boolean = false ;
  accountTypes: { type: string; key: string }[] = [
    { type: 'Total Insurance', key: 'insurance' },
    { type: 'IncomeTax Pay', key: 'income_tax' },
    { type: 'Net Pay', key: 'net_pay' },
  ];
  setting: any;
  bankingData: any;
  constructor(private LocalStoreService : LocalStoreService, private settingService:SettingService,
    private fb : FormBuilder , private toastr: ToastrService, private bankinService: BankingService
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
  forBussinessId(){
    this.user = this.LocalStoreService.getItem('user');
  }
  submitForm() {
    const data: { [key: string]: any } = {
      insurance: {},
      income_tax: {},
      net_pay: {},
      business: this.user.business,
    };

    this.accounts.forEach(account => {
      if (account.enable) {
        const mapping = this.accountTypes.find(type => type.type === account.type);
        if (mapping) {
          const key = mapping.key;
          data[key] = {
            payment_account: account.payment_account,
            deposite_account: account.deposite_account,
          };
        }
      }
    });
    this.settingService.createSettingsPaySlips(data).subscribe(
      response => {
        console.log('Response:', response);
        // this.successCall.emit();
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
    this.settingService.getSettingsPaySlips(this.user?.business).subscribe(
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
