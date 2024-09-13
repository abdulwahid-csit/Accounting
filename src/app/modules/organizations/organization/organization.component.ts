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
//   name: string;

//   industry: string

//   businessType: string

// adminEmail: string;

//   status: string;

// einNumber: string;

// ntnNumber: string;

//   address: string;

//   domain: string;

//     logo: string;

//   phone: string;

// city: string

//   zip: string

// state: string
  ngOnInit(): void {
    this.form = this.fb.group({
    
      ein: [''],
      phone: ['']
    });

    this.form.get('ein')?.valueChanges.subscribe((value: any) => {
      if (value) {
        this.form.get('phone')?.disable();
      } else {
        this.form.get('phone')?.enable();
      }
    });

    this.form.get('phone')?.valueChanges.subscribe((value: any) => {
      if (value) {
        this.form.get('ein')?.disable();
      } else {
        this.form.get('ein')?.enable();
      }
    });
  }
}
