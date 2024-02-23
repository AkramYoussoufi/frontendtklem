import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AuthService } from '../../service/api/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  messages!: Message[];
  login = { email: '', password: '' };
  loading = false;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginRequest() {
    this.loading = true;
    this.authService.loginRequest(this.login).subscribe(
      (data: any) => {
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        this.cookieService.set('token', data.token, oneYearFromNow);
        this.router.navigate(['/dashboard']);
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
