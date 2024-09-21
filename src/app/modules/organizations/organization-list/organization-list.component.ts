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
 
  constructor( private modalService:BsModalService, private crudService:CrudService){
  }

  applicationList: any[] = [];
 
  columns = [
    { name: 'Type', key: 'isChecked', isCheckbox: true },
    { name: 'Name', key: 'name', },
    { name: 'Industry', key: 'industry' },
    { name: 'Business Type', key: 'business_type' },
    { name: 'adminn Email', key: 'admin_email' },
    { name: 'ein Number', key: 'ein_number' },
    { name: 'ntn Number', key: 'ntn_number' },
    { name: 'Address', key: 'business_address' },
    { name: 'Domain', key: 'domain' },
    { name: 'Phone', key: 'phone' },
    { name: 'City', key: 'city' },
    { name: 'Zip', key: 'zip' },
    { name: 'State', key: 'state' },
    { name: 'Country', key: 'country' },


  ];

 openitemModal() {
  this.modalService.show(OrganizationComponent, {
    class: 'modal-dialog modal-dialog-centered modal-xl ',
    backdrop: 'static',
    keyboard: true,
  });
}



ngOnInit() {
  this.organizationList();
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
 organizationList(){

  this.crudService.read('business').subscribe(response => {
    if (response.data?.status_code === 200) {
      this.applicationList = response.data.data.payload;
      this.tableConfig.paginationParams = response.data.data.paginate_options;
    } else {
      console.log("Error response: ", response);
    }
  }, error => {
    console.error("An error occurred while fetching data:", error);
  });
}
}
