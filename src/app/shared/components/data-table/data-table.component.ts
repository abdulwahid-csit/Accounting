import { TransactionsListComponent } from './../../../modules/dashboard/components/bank-account-list/transactions-list/transactions-list.component';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { count } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Output() changePage = new EventEmitter<number>();
  @Input() columns: any;
  @Input() config: any;
  @Input() dataSet: any[] = [];
  @Input() searchTerm: string = '';
  @Input() editMethod!: (row: any) => void;
  @Input() deleteMethod!: (row: any) => void;
  @Input() toggleSwitch!: (row: any) => void;
  filterData: any[] = [];
  startItem: number = 0;
  endItem: number = 0;
  private _moduleName!: string;

  columnNameMap: any = {
    user_count: 'Users',
    application_count: 'Total No of Applications',
    created_at: 'Creation Date',
    app_name: 'Name',
    app_id: 'App ID',
    first_name: 'Full Name',
    last_logged_in: 'Last Sign in'
  };

  @Input() set module(value: string) {
    this._moduleName = value;
  }

  get module(): string {
    return this._moduleName;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.printDataset();
   }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] || changes['dataSet'] || changes['config']) {
      this.filteredData();
      this.updatePaginationRange();
    }
  }

  getUpdatedColumns() {
    return this.columns.map((column: string | number) => {
      return this.columnNameMap[column] || column;
    });
  }

  filteredData() {
    if (!Array.isArray(this.dataSet)) {
      // this.filterData = [];
      return;
    }

      // this.filterData = this.dataSet;
    // if (!this.searchTerm) {
    // } else {
    //   const lowercasedSearchTerm = this.searchTerm.toLowerCase();
    //   this.filterData = this.dataSet.filter((item: any) =>
    //     Object.values(item).some(value => {
    //       if (value === null || value === undefined) {
    //         return false;
    //       }
    //       return value.toString().toLowerCase().includes(lowercasedSearchTerm);
    //     })
    //   );
    // }
  }

  updatePaginationRange() {
    const paginationParams = this.config?.paginationParams || {};
    const currentPage = paginationParams.current_page || 1;
    const itemsPerPage = (paginationParams.items_per_page ? paginationParams.items_per_page : paginationParams.payload_size ) || 10;
    const totalRecords = paginationParams.total_records ? paginationParams.total_records  : paginationParams.payload_size || this.filterData.length;
    this.startItem = (currentPage - 1) * itemsPerPage + 1;
    this.endItem = Math.min(currentPage * itemsPerPage, totalRecords);
  }


  onRowClick(rowData: any) {
    let detailRoute: string;
    if (this.module === 'dashboard') {
      return;
    }
    switch (this.module) {
      case 'organization':
      case 'roles':
      case 'application':
      case 'user':
      case 'secret':
      case 'team-member':
        detailRoute = `/layout/${this.module}/details/${rowData.id}`;
        break;
      default:
        detailRoute = '/';
        break;
    }

    this.router.navigate([detailRoute]);
  }

  getObjectValues(value: any) {
    if (value && typeof value == 'object') {
      let title:string = value.title;
      return title.length > 30 ? title.slice(0, 20) + '...' : title;
    }
    return '';
  }

  getTitle(value: any) {
    if (value && typeof value == 'object') {
      return value.title;
    }
    return '-';
  }



  getRole(value: any) {
    if (value && typeof value === 'object') {
      return value.title;
    }
    return '';
  }

  getCreatedBy(value: any) {
    if (value && typeof value === 'object') {
      return value.first_name + ' ' + value.last_name;
    }
    return '';
  }

  getCreatedByPicture(value: any) {
    if (value && typeof value === 'object') {
      return value.profile_picture;
    }
    return '';
  }
  onPageChange(item: number) {
    this.changePage.emit(item);
    this.updatePaginationRange();
  }
  // toggleSelectAll(event: any): void {
  //   if (event.target.checked) {
  //     this.selectedItems = [...this.applicationList];
  //   } else {
  //     this.selectedItems = [];
  //   }
  // }


  printDataset(){
    setTimeout(() => {
      console.log('Data set in datatable: ', this.dataSet);
      this.filterData = this.dataSet;
      // this.columns = this.columns.map((column: string | number) =>
      //   column.toString().replace(/[_-]/g, ' ').trim()
      // );
       }, 2000);
  }

  printRows(column: any){
console.log("Coulumns in datatable: ", column);
  }
}
