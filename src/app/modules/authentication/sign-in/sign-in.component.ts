import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {

  }
  hidePassword = true;
  isPasswordVisible: boolean = false;
  signInForm!: FormGroup
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Z a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required])],

    })
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.signInForm.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
  onControlBlur(controlName: string): void {
    const control = this.signInForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    this.isLoading = true;

    this.authService.signIn(email, password).subscribe({
      next: (response: any) => {
        if (response?.data) {
          const { access_token, refresh_token, access_token_expires, user } = response.data?.data;
          if (access_token && refresh_token && access_token_expires && user) {
            this.authService.storeTokens(access_token, refresh_token, access_token_expires, user);
            console.log("Tokens stored to localstorage.")
            this.router.navigate(['dashboard']);
          } else {
            this.toast.error("Incomplete response data");
            console.error("Incomplete response data:", response);
          }
        } else {
          this.toast.error("Unexpected response format");
          console.error("Unexpected response format:", response);
        }
      },
      error: (error) => {
        this.toast.error("Error!");
        console.error("Error from login API:", error);
        if (error.error?.message) {
          this.toast.error(error.message, "Error!");
        } else {
          this.toast.error("An unknown error occurred", "Error!");
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


}
