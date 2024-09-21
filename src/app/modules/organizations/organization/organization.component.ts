import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {
  form: FormGroup | any;

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
  }


  close(){
    this.modelService.hide();
  }

  initialize() {
    this.form = this.fb.group({
      name: [''],
      industry: [''],
      business_type: [''],
      admin_email: [''],
      ein_number: [''],
      ntn_number: [''],
      address: [''],
      domain: [''],
      phone: [''],
      city: [''],
      state: [''],
      zip:[''],
      country:['']
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

  onSubmit() {
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
  }
  
}

