import { Component } from '@angular/core';
import {
  faUser,
  faAngleDown,
  faBell,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/service/api/admin.service';
import { AuthService } from 'src/app/service/api/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faUser = faUser;
  faAngleDown = faAngleDown;
  faBell = faBell;
  faPowerOff = faPowerOff;
  username!: string;

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {
    this.getCurrentLoggedUser();
  }

  getCurrentLoggedUser() {
    this.adminService.getCurrentLoggedUser().subscribe((data: any) => {
      this.username = data.email;
    });
  }

  logout() {
    this.authService.logout();
  }
}
