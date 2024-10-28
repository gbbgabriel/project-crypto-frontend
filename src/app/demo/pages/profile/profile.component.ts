import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../@theme/components/card/card.component';
import { BackSvgComponent } from '../application/profile/user-profiles/back-svg/back-svg.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopSvgComponent } from '../application/profile/user-profiles/top-svg/top-svg.component';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/authentication-1/login/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { User } from '../../../@theme/types/user';
import { CryptoService } from '../dashboard/default/services/crypto.service';
import { MatCard, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    BackSvgComponent,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    RouterLink,
    RouterOutlet,
    TopSvgComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardHeader,
    MatCard
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  isLoading = true;
  conversionHistory: Array<{ crypto: string; amount: number; valueBRL: number; valueUSD: number }> = [];
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private readonly cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    });

    this.authService.getUserProfile().subscribe({
      next: (data: User) => {
        if (data) {
          this.userForm.patchValue({
            id: data.id,
            name: data.name,
            email: data.email,
          });
        }
      },
      error: (err) => {
        console.error('Erro ao obter os dados do usuário:', err);
      },
    });

    this.loadConversionHistory();
  }

  loadConversionHistory(): void {
    this.cryptoService.getConversionHistory().subscribe({
      next: (history) => {
        this.conversionHistory = history;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar o histórico de conversões:', err);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  saveUser() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.getRawValue();

      this.authService.updateUserProfile(updatedUser).subscribe({
        next: () => {
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          currentUser.name = updatedUser.name;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          alert('User updated successfully');
        },
        error: (err) => {
          console.error('Erro ao atualizar o usuário:', err);
        },
      });
    }
  }

  cancelEdit() {
    this.authService.getUserProfile().subscribe({
      next: (data: User) => {
        this.userForm.patchValue({
          id: data.id,
          name: data.name,
          email: data.email,
        });
      },
      error: (err) => {
        console.error('Erro ao obter os dados do usuário:', err);
      },
    });
  }

  formatCurrency(value: number, currencyCode: string): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
}
