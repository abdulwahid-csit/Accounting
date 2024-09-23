import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../setting.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
@Component({
  selector: 'app-Payslips',
  templateUrl: './Payslips.component.html',
  styleUrls: ['./Payslips.component.scss', '../../../../css/custpm-dropdown-style.scss']
})
export class PayslipsComponent implements OnInit {
  settingForm! : FormGroup
  user: any;
  accounts: Array<{ type: string; enable: boolean; payment_account: string; deposit_account: string }> = [];
  update : boolean = false ;
  accountTypes: { type: string; key: string }[] = [
    { type: 'Total Insurance', key: 'insurance' },
    { type: 'IncomeTax Pay', key: 'income_tax' },
    { type: 'Net Pay', key: 'net_pay' },
  ];
  setting: any;
  constructor(private LocalStoreService : LocalStoreService, private settingService:SettingService,
    private fb : FormBuilder , private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeAccounts();
    this.forBussinessId();
    this.fetchSetting();
  }

  initializeAccounts() {
    this.accounts = this.accountTypes.map(({ type }) => ({
      type,
      enable: false,
      payment_account: '',
      deposit_account: '',
    }));
  }

  toggleAccount(index: number) {
    const account = this.accounts[index];
    if (!account.enable) {
      account.payment_account = ''; // Reset if unchecked
      account.deposit_account = '';  // Reset if unchecked
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
            deposit_account: account.deposit_account,
          };
        }
      }
    });
    this.settingService.createSettingsPaySlips(data).subscribe(
      response => {
        console.log('Response:', response);
        // this.successCall.emit();
        if(!this.update){
          this.toastr.success('settings save successfully ', 'success');
        }else{
          this.toastr.success('settings update successfully ', 'success');

        }
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
          this.accounts.forEach(account => {
            const mapping = this.accountTypes.find(type => type.type === account.type);
            if (mapping) {
              // Update payment and deposit accounts
              account.payment_account = this.setting[mapping.key]?.payment_account || '';
              account.deposit_account = this.setting[mapping.key]?.deposit_account || ''; 
              account.enable = account.payment_account !== '' || account.deposit_account !== '';
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
  
 
}
