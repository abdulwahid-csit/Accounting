import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OrganizationComponent } from '../organization/organization.component';
import { CrudService } from 'src/app/shared/services/crud.service';
@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent {
  applicationList: any[] = [];
  modalRef: any;

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

  columns: any = [
];
 
  constructor(private modalService:BsModalService, private crudService:CrudService){}

  ngOnInit() {
    this.organizationList();
  }
  
openitemModal() {
  this.modalService.show(OrganizationComponent, {
    class: 'modal-dialog modal-dialog-centered modal-xl ',
    backdrop: 'static',
    keyboard: true,
  });
}

updateOrganization(data?: any) {
  data = data
  console.log("data for update",data)
  const initialState = { data: data};
  this.modalRef = this.modalService.show(OrganizationComponent, {
    class: 'modal-dialog modal-dialog-centered modal-xl create_organization',
    backdrop: 'static',
    keyboard: true,
    initialState
  });
  this.modalRef.content.successCall.subscribe(() => {
    this.organizationList();
  });
}

 organizationList(){
   this.crudService.read('business').subscribe(response => {
    if (response.data?.status_code === 200 || response.data?.status_code === 201) {
      const column = Object.keys(response.data?.data?.payload[(0)]);
      this.columns = column.filter((column:string) =>  column !== 'id');
      this.applicationList = response.data?.data?.payload;
      this.tableConfig.paginationParams = response.data.data.paginate_options;
    } else {
      console.log("Error response: ", response);
    }
  }, error => {
    console.error("An error occurred while fetching data:", error);
  });
}
// this.CrudService.read('charts-of-accounts').subscribe(response => {
//   if (response?.data?.status_code == 201 || response.data?.status_code == 200) {
//     const column = Object.keys(response.data?.data?.payload[0]);
//     this.columns = column.filter((column: string) => column !== '_id' &&
//     column !== 'business' && column !== 'is_deleted' && column !== 'active');
//     this.dataSet = response.data?.data?.payload;
//     console.log("Columns are: ", this.columns);
//     console.log("Charts of account data.", this.dataSet);
//     this.tableConfig.paginationParams = response?.data?.data?.paginate_options      }
// }, error => {
//   console.log("Error ", error.message)
// })

editRow(row: any) {
  this.updateOrganization(row);
}

deleteRow(row: any) {
  const id = row.id; 
   const confirmDelete = confirm('Are you sure you want to delete this item?');
  if (confirmDelete) {
    if (!id) {
      console.error('No ID found for deletion');
      return; 
    }
    const endpoint = 'business'; 
    this.crudService.delete(endpoint, id).subscribe(
      () => {
        console.log('Delete successful');
        this.organizationList(); 
      },
      error => {
        console.error('Error deleting banking resource:', error);
      }
    );
  }
}
}