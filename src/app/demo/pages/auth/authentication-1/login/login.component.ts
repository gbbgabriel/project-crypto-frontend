// angular import
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthService } from './services/auth.service';
import { AuthenticationService } from '../../../../../@theme/services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication-1.scss', '../../authentication.scss']
})
export class LoginComponent implements OnInit {
  // public props
  hide = true;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef
  ) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard/default']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formValues() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.formValues['email'].value, this.formValues['password'].value)
      .pipe(first())
      .subscribe(
        (response) => {
          this.router.navigateByUrl('/').then(() => {
            window.location.href = '/';
          });
        },
        (error) => {
          console.log(error);
          this.error = error.error?.message || 'Credenciais incorretas. Verifique seu e-mail e senha.';
          this.loading = false;
        }
      );
  }
}
