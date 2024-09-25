import { Component, ViewChild } from '@angular/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { VoucherComponent } from '../voucher/voucher.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.scss']
})
export class JournalVoucherComponent {
  applicationList: any[] = [];

  columns = [
    { name: 'Type', key: 'isChecked', isCheckbox: true },
    { name: 'Voucher Number', key: '_id' }, 
    { name: 'Date', key: 'date' },
    { name: 'Description', key: 'description' }, 
    { name: 'Account Debit', key: 'debit_voucher[0].branch_account.name' }, 
    { name: 'Account Credit', key: 'credit_voucher[0].branch_account.name' }, 
    { name: 'Balance', key: 'balance' }, 
    { name: 'Status', key: 'is_deleted' },
    { name: 'Mapping status', key: 'mapping_status' },
    { name: 'Mapping', key: 'mapping' }
];


  bsConfig = {
    isAnimated: true
  };

  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective | any;

  openDatepicker() {
    this.datepicker?.show();
  }
  constructor(private modalService: BsModalService, private crudService: CrudService) { }

  ngOnInit() {
    this.fetchData();

  }

  tableConfig = {
    paginationParams: {
      total_pages: 1,
      payload_size: 10,
      has_next: false,
      current_page: 1,
      skipped_records: 0,
      total_records: 10
    }
  };

 
 
  openVoucherModal() {
    this.modalService.show(VoucherComponent, {
      class: 'modal-dialog modal-dialog-centered modal-xl create_organization',
      backdrop: 'static',
      keyboard: true,
    });
  }

  fetchData() {
    this.crudService.read('journal-voucher').subscribe(response => {
      if(response.data?.status_code == 201){
        this.applicationList = response.data?.data?.payload;
        this.tableConfig.paginationParams.total_records = response.data?.data?.total_records;
        console.log("Data Fetched, ", response);
      }
    }, error => {
      console.log("Error", error.message);
    })
  }
}
