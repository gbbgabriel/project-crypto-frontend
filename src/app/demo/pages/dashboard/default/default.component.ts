import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { EarningChartComponent } from '../../apex-chart/earning-chart/earning-chart.component';
import { RevenueChartComponent } from '../../apex-chart/revenue-chart/revenue-chart.component';
import { ProjectOverviewChartComponent } from '../../apex-chart/project-overview-chart/project-overview-chart.component';
import { TotalIncomeChartComponent } from '../../apex-chart/total-income-chart/total-income-chart.component';
import { CryptoService } from './services/crypto.service';

interface ConversionResult {
  valueBRL: number;
  valueUSD: number;
}

interface FavoriteCrypto {
  id: string;
  crypto: string;
  userId: string;
  createdAt: string;
}

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TotalIncomeChartComponent,
    ProjectOverviewChartComponent,
    EarningChartComponent,
    RevenueChartComponent
  ],
  templateUrl: './default.component.html',
  styleUrls: ['../dashboard.scss', './default.component.scss']
})
export class DefaultComponent implements OnInit {
  cryptoForm: FormGroup;
  cryptoList: Array<{ id: string, name: string }> = [];
  filteredCryptoList$: Observable<Array<{ id: string, name: string }>> = of([]);
  conversionResult: ConversionResult | null = null;
  favorites: Array<FavoriteCrypto> = [];
  conversionHistory: Array<{ crypto: string; amount: number; valueBRL: number; valueUSD: number }> = [];
  isLoading: boolean = false;
  isError: boolean = false;
  selectedCrypto: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private cryptoService: CryptoService
  ) {
    this.cryptoForm = this.formBuilder.group({
      crypto: new FormControl('', Validators.required),
      amount: new FormControl(1, Validators.required)
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadCryptoList();
    this.loadFavorites();

    this.filteredCryptoList$ = this.cryptoForm.get('crypto')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCryptos(value || ''))
    );

    // Observa mudanças no campo de criptomoeda e atualiza `selectedCrypto`
    this.cryptoForm.get('crypto')!.valueChanges.subscribe(value => {
      const selectedCrypto = this.cryptoList.find(crypto => crypto.id === value || crypto.name === value);
      this.selectedCrypto = selectedCrypto ? selectedCrypto.id : '';
    });
  }

  loadCryptoList(): void {
    this.cryptoService.getCryptoList().subscribe({
      next: (cryptos) => {
        this.cryptoList = cryptos;
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Erro ao carregar a lista de criptomoedas:', err);
        this.isError = true;
        this.checkLoadingComplete();
      }
    });
  }

  private filterCryptos(value: string): Array<{ id: string, name: string }> {
    const filterValue = value.toLowerCase();
    return this.cryptoList.filter(crypto => crypto.name.toLowerCase().includes(filterValue));
  }

  isCryptoInDropdown(): boolean {
    return this.cryptoList.some(crypto => crypto.id === this.selectedCrypto);
  }

  loadFavorites(): void {
    this.cryptoService.getFavoriteCryptos().subscribe({
      next: (favorites: any[]) => {
        this.favorites = favorites.map(fav =>
          typeof fav === 'string'
            ? { id: '', crypto: fav, userId: '', createdAt: new Date().toISOString() }
            : fav
        );
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Erro ao carregar os favoritos:', err);
        this.isError = true;
        this.checkLoadingComplete();
      }
    });
  }

  convertCrypto(): void {
    if (this.cryptoForm.valid && this.isCryptoInDropdown()) {
      const { crypto, amount } = this.cryptoForm.value;
      this.cryptoService.convertCrypto(crypto, amount).subscribe({
        next: (result: ConversionResult) => {
          this.conversionResult = result;
        },
        error: (err) => {
          console.error('Erro ao converter criptomoeda:', err);
          this.isError = true;
        }
      });
    }
  }

  toggleFavorite(crypto: string): void {
    if (this.isFavorite(crypto)) {
      this.cryptoService.unfavoriteCrypto(crypto).subscribe({
        next: () => {
          this.favorites = this.favorites.filter(fav => fav.crypto !== crypto);
        },
        error: (err) => {
          console.error('Erro ao desfavoritar criptomoeda:', err);
          this.isError = true;
        }
      });
    } else {
      this.cryptoService.favoriteCrypto(crypto).subscribe({
        next: () => {
          this.favorites.push({ id: '', crypto, userId: '', createdAt: new Date().toISOString() });
        },
        error: (err) => {
          console.error('Erro ao favoritar criptomoeda:', err);
          this.isError = true;
        }
      });
    }
  }

  isFavorite(crypto: string): boolean {
    return this.favorites.some(fav => fav.crypto === crypto);
  }

  private checkLoadingComplete(): void {
    if (this.cryptoList.length > 0 || this.isError) {
      this.isLoading = false;
    }
  }

  formatCurrency(value: number, currencyCode: string): string {
    if (value < 0.01) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      }).format(value);
    } else {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    }
  }
}
