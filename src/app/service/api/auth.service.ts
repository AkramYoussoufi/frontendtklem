import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environement } from 'src/Environement';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }
  loginRequest(data: any) {
    return this.http.post(Environement.URL_API + 'api/auth/signup', data, {
      headers: this.headers,
    });
  }

  checkJWT() {
    return this.http.post(
      Environement.URL_API + 'api/auth/check',
      { token: this.cookieService.get('token') },
      {
        headers: this.headers,
      }
    );
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
