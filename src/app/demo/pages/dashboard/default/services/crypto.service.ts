import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  constructor(private http: HttpClient) {}

  getCryptoList(): Observable<Array<{ id: string, name: string }>> {
    return this.http.get<Array<{ id: string, name: string }>>(`${environment.baseUrl}/crypto/list`);
  }

  convertCrypto(crypto: string, amount: number): Observable<{ valueBRL: number, valueUSD: number }> {
    return this.http.post<{ valueBRL: number, valueUSD: number }>(
      `${environment.baseUrl}/crypto/convert`,
      { crypto, amount }
    );
  }

  favoriteCrypto(crypto: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/crypto/favorite`, { crypto });
  }

  unfavoriteCrypto(crypto: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/crypto/unfavorite`, { crypto });
  }

  getFavoriteCryptos(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.baseUrl}/crypto/favorites`);
  }

  getConversionHistory(): Observable<Array<{ crypto: string; amount: number; valueBRL: number; valueUSD: number }>> {
    return this.http.get<Array<{ crypto: string; amount: number; valueBRL: number; valueUSD: number }>>(
      `${environment.baseUrl}/crypto/history`
    );
  }
}
