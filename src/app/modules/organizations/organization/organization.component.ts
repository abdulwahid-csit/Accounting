import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {
  form: FormGroup | any;
  @Input() data: any;
  isUpdateData = false;


  constructor(private fb: FormBuilder, private CrudService:CrudService , private modelService:BsModalService) {}

  ngOnInit(): void {

    this.initialize();

    this.form.get('ein_number')?.valueChanges.subscribe((value: any) => {
      if (value) {
        this.form.get('ntn_number')?.disable();
      } else {
        this.form.get('ntn_number')?.enable();
      }
      
    });

    this.form.get('ntn_number')?.valueChanges.subscribe((value: any) => {
      if (value) {
        this.form.get('ein_number')?.disable();
      } else {
        this.form.get('ein_number')?.enable();
      }
    });

    if(this.data){
      this.isUpdateData = true;
      this.initailizeUpdateData();
    }
  }


  close(){
    this.modelService.hide();
  }

  initialize() {
    this.form = this.fb.group({
      name: ['',Validators.required],
      industry: ['',Validators.required],
      business_type: ['',Validators.required],
      admin_email: ['',Validators.required],
      ein_number: ['',Validators.required],
      ntn_number: ['',Validators.required],
      address: ['',Validators.required],
      domain: ['',Validators.required],
      phone: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip:['',Validators.required],
      country:['',Validators.required]
    });
  }
  
  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.form.patchValue({
  //         logo: e.target.result 
  //       });
  //     };
  //     reader.readAsDataURL(file); 
  //   }
  // }


  initailizeUpdateData(){
      this.form = this.fb.group({
        name: [this.data?.name],
        industry: [this.data?.industry],
        business_type: [this.data.business_type],
        admin_email: [this.data.admin_email],
        ein_number: [this.data.ein_number],
        ntn_number: [this.data.ntn_number],
        address: [this.data.address],
        domain: [this.data.domain],
        phone: [this.data.phone],
        city: [this.data.city],
        state: [this.data.city],
        zip:[this.data.zip],
        country:[this.data.country]
      });
  }

  onSubmit() {
    if(this.isUpdateData){
      this.CrudService.update('business', this.data.id, this.form.value).subscribe(response => {
        this.data = response;
      })
      this.close()
      return
    }
    const formValue = this.form.value;
    if (formValue.ein_number) {
      const { ntn_number, ...dataToLog } = formValue;
      console.log('Data logged (excluding ntnNumber):', dataToLog);
    } else if (formValue.ntn_number) {
      const { ein_number, ...dataToLog } = formValue;
      console.log('Data logged (excluding einNumber):', dataToLog);
    } else {
      console.log('Form Data:', formValue);
    }
  
    // Sending API response to create
    this.CrudService.create('business', formValue).subscribe(response => {
      if (response.data?.status_code === 200) {
        console.log("Creation successful, Data: ", response.data?.data);
      } else {
        console.log("Error response: ", response);
      }
    });
    this.close();
  }
  
}

