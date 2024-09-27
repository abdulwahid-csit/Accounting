import { Component, ViewChild } from '@angular/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { VoucherComponent } from '../voucher-Modal/voucher.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.scss']
})
export class JournalVoucherComponent {
  applicationList: any[] = [];

  columns:any = [

  ];

  bsConfig = {
    isAnimated: true
  };

  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective | any;

  openDatepicker() {
    this.datepicker?.show();
  }
  constructor(private modalService: BsModalService,
    private CrudService : CrudService
  ) { }

  ngOnInit() {
    this.fetchJournalVoucher();
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
  // @ViewChild(VoucherComponent, { static: false }) VoucherComponent!: VoucherComponent;

  fetchJournalVoucher() {

    this.CrudService.read('journal-voucher',).subscribe((response)=>{
      const column = Object.keys(response.data?.data?.payload[(0)]);
      this.columns = column.filter((column:string) =>  column !== 'id');
      this.applicationList = response.data?.data?.payload;
      console.log("here is the response of the journal entry", response.data);
      this.applicationList = response.data?.data?.payload;
      this.tableConfig.paginationParams = response?.data?.data?.paginate_options;

    })
  }

  openVoucherModal() {
    this.modalService.show(VoucherComponent, {
      class: 'modal-dialog modal-dialog-centered modal-xl create_organization',
      backdrop: 'static',
      keyboard: true,
    });
  }

}
