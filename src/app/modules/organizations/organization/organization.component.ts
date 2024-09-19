import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {
  form: FormGroup | any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initialize();

    this.form.get('einNumber')?.valueChanges.subscribe((value: any) => {
      if (value) {
        this.form.get('ntnNumber')?.disable();
      } else {
        this.form.get('ntnNumber')?.enable();
      }
    });

    this.form.get('ntnNumber')?.valueChanges.subscribe((value: any) => {
      if (value) {
        this.form.get('einNumber')?.disable();
      } else {
        this.form.get('einNumber')?.enable();
      }
    });
  }

  initialize() {
    this.form = this.fb.group({
      name: [''],
      industry: [''],
      businessType: [''],
      adminEmail: [''],
      status: [''],
      einNumber: [''],
      ntnNumber: [''],
      address: [''],
      domain: [''],
      logo: [''],
      phone: [''],
      city: [''],
      state: [''],
    });
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.patchValue({
          logo: e.target.result 
        });
      };
      reader.readAsDataURL(file); 
    }
  }

  onSubmit() {
    const formValue = this.form.value;
    if (formValue.einNumber) {
      const { ntnNumber, ...dataToLog } = formValue;
      console.log('Data logged (excluding ntnNumber):', dataToLog);
    } else if (formValue.ntnNumber) {
      const { einNumber, ...dataToLog } = formValue;
      console.log('Data logged (excluding einNumber):', dataToLog);
    } else {
      console.log('Form Data:', formValue);
    }
  }
}

