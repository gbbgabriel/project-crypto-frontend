// angular import
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// project import
import { environment } from 'src/environments/environment';
import { User } from '../types/user';

// Import the 'map' operator from 'rxjs/operators'
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSignal = signal<User | null>(null);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser) as User);
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSignal();
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<User>(`${environment.baseUrl}/auth/signup`, { name, email, password }).pipe(
      map((user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSignal.set(user);
        return user;
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.baseUrl}/auth/login`, { email, password }).pipe(
      map((user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSignal.set(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
    this.router.navigate(['/authentication-1/login']);
  }
}
