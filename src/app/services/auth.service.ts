import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dev.myemprove.com/api/ver3api/student-login';
  private storageKey = 'currentUser';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const payload = {
      email,
      password,
      device_type: 'W',
      device_token: '',
      device_model: '',
      app_version: '',
      os_version: '',
      phone_code: '965'
    };

    return this.http.post(`${this.apiUrl}`, payload).pipe(
      tap((response: any) => {
        if (response.success) {
          const userData = response.data;
          const token = response.token;


          localStorage.setItem(this.storageKey, JSON.stringify(userData));
          localStorage.setItem('token', JSON.stringify(token));
          // this.setCurrentUser(userData);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('token');
    // this.setCurrentUser(null);
    this.router.navigate(['/login']);
  }

  // private setCurrentUser(userData: any) {
  //   this.setCurrentUser = userData;
  // }

  getUser() {
    const storedUser = localStorage.getItem(this.storageKey);
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  }
}
