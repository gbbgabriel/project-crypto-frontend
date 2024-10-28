import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment';
import { User } from '../../../../../../@theme/types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/signup`, data);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/me`).pipe(
      map((profile) => {
        if (profile) {
          this.currentUserSubject.next(profile);
        }
        return profile;
      })
    );
  }

  updateUserProfile(updatedUser: Partial<User>): Observable<User> {
    const currentUser = this.currentUserValue;

    if (!currentUser) {
      throw new Error('Usuário não encontrado.');
    }

    const userId = currentUser.id;

    return this.http.patch<User>(`${environment.baseUrl}/user/${userId}`, updatedUser).pipe(
      map((user) => {
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }
}
