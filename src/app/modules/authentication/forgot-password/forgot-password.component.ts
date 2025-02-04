import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private crudservice:CrudService,
    private router:Router,
    private toast: ToastrService) { }

  ngOnInit(): void {

    this.forgotForm = this.fb.group({
      email: ['', [Validators.required,  Validators.pattern("^[A-Z a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]  // Added email validation
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.forgotForm.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  // onSubmit(): void {
  //   console.log(this.forgotForm.value);
  //   const body = this.forgotForm.value
  //   if (this.forgotForm.valid) {
  //     this.crudservice.create('auth/forgot-password',body).subscribe(
  //       (response) => {
  //         this.router.navigate(['/verify-otp'], { queryParams: body });
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     this.forgotForm.markAllAsTouched();
  //   }
  // }

  onControlBlur(controlName: string): void {
    const control = this.forgotForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }

}
