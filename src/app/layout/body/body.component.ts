import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/service/api/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class BodyComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.checkJWT().subscribe((data: any) => {
      console.log(data);
      if (data.role == 'RECIEVER') {
        this.router.navigate(['/reciever']);
      } else if (data.role != 'ADMIN') {
        this.router.navigate(['/auth']);
      }
    });
  }
}
