import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { SettingService } from '../setting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-General',
  templateUrl: './General.component.html',
  styleUrls: ['./General.component.scss', '../../../css/custpm-dropdown-style.scss', '../../../css/custom-datepicker-style.scss']
})
export class GeneralComponent implements OnInit {
settingForm! : FormGroup
isSwitchChecked: boolean = false;
isCloseBooked: boolean = false;
months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
  user: any;
  setting: any;
  update: boolean = false;

  constructor(private LocalStoreService : LocalStoreService, private settingService:SettingService,
    private fb : FormBuilder , private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.forBussinessId();
    this.initForm();
    this.fetchSetting();
  }
  initForm() {
    this.settingForm = this.fb.group({
      // firstMonthFinancialYear: ['', Validators.required],
      month_of_financial_year: [''],
      month_of_tax_year: [''],
      accounting_method: [''],
      close_book: [false],
      close_book_date: [''],
      business : [''],
      // isAccountNumbersEnabled: [false],
      // showAccountNumbers: [false],
    });
  }
  submitForm() {
    if(this.settingForm?.invalid){
      this.settingForm?.markAllAsTouched();
    return
    }
    const postData = this.settingForm.value
    postData['business'] = this.user.business
    if(!postData['close_book']){
      postData['close_book_date'] = '',
      postData['close_book'] = false
    }
    this.settingService.createBankingResource(postData).subscribe(
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
  
  forBussinessId(){
    this.user = this.LocalStoreService.getItem('user');
  }
  resetData() {
    this.toastr.success('settings reset successfully ', 'success');
    this.settingForm.reset();
  }

  removeInvalidEntries() {
    // Remove invalid entries logic
  }
  fetchSetting() {
    this.settingService.getGenralSetting(this.user.business).subscribe(
      (response: any) => {
        if (response?.data?.data) {
          this.setting = response?.data?.data;
          this.update = true
          this.fillForm(this.setting);
        } else {
          console.error('Unexpected response format', response);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  fillForm(settingData: any) {
    this.settingForm.patchValue({
      month_of_financial_year: settingData.month_of_financial_year, // Month of financial year
      month_of_tax_year: settingData.month_of_tax_year, // Month of tax year
      accounting_method: settingData.accounting_method, // Accounting method
      close_book: settingData.close_book, // Close the books
      close_book_date: settingData.close_book_date ? new Date(settingData.close_book_date) : null, // Closing date
      // changesAfterWarning: 'Allow changes after viewing a warning', 
      // isAccountNumbersEnabled: false, 
      // showAccountNumbers: false, 
    });
  }
}
