import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { CrudService } from 'src/app/shared/services/crud.service';


@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss']
})
export class JournalEntryComponent implements OnInit {

  applicationList: any[] = [];

  columns: any = [
  ];

  bsConfig = {
    isAnimated: true
  };

  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective | any;

  openDatepicker() {
    this.datepicker?.show();
  }
  constructor(private CrudService : CrudService) { }

  ngOnInit() {
    this.fetchJournalEntry();
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
  fetchJournalEntry() {

    this.CrudService.read('journal-entry',).subscribe((response)=>{
      const column = Object.keys(response.data?.data?.payload[(0)]);
      console.log("here are the columns of journal", column);
      this.columns = column.filter((column:string) =>  column !== 'id');
      this.applicationList = response.data?.data?.payload;
      console.log("here is the response of the journal entry", response.data);
      this.applicationList = response.data?.data?.payload;
      this.tableConfig.paginationParams = response?.data?.data?.paginate_options;

    })
  }

}
