import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthenticationService } from '../../../../../@theme/services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../authentication-1.scss', '../../authentication.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide = true;
  coHide = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatchValidator });
  }

  get emailErrorMessage() {
    if (this.registerForm.get('email')?.hasError('required')) {
      return 'Você deve inserir um e-mail';
    }
    return this.registerForm.get('email')?.hasError('email') ? 'E-mail inválido' : '';
  }

  get passwordErrorMessage() {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'A senha é obrigatória';
    }
    return passwordControl?.hasError('minlength') ? 'A senha deve ter pelo menos 6 caracteres' : '';
  }

  get passwordMismatchError(): boolean {
    return this.registerForm.hasError('passwordMismatch') && !!this.registerForm.get('confirmPassword')?.touched;
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  submit() {
    this.errorMessage = null;

    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.signup(name, email, password).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/authentication-1/login']);
        },
        error: (err) => {
          if (err.status == 409) {
            this.errorMessage = 'E-mail já está em uso';
          } else {
            this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.' + err;
          }
        }
      });
    }
  }
}
