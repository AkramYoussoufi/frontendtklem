import { Component, DoCheck, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AuthService } from '../../service/api/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  messages!: Message[];
  login = { email: '', password: '' };
  loading = false;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  loginRequest() {
    this.loading = true;
    this.cookieService.delete('token');
    this.authService.loginRequest(this.login).subscribe(
      (data: any) => {
        this.cookieService.delete('token');
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        this.cookieService.set('token', data.token, oneYearFromNow);
        if (data.role == 'ADMIN') {
          this.router.navigate(['/dashboard/approbation']);
        } else if (data.role == 'RECIEVER') {
          this.router.navigate(['/reciever']);
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messages = [
          {
            severity: 'error',
            summary: 'Failed',
            detail: 'Votre tentative de connexion a échoué',
          },
        ];
      }
    );
  }
}
