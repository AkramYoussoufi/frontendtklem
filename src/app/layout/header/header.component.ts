import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faAngleDown,
  faBell,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { AdminService } from 'src/app/service/api/admin.service';
import { Admin } from 'src/app/util/domain/Admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faAngleDown = faAngleDown;
  faBell = faBell;
  faPowerOff = faPowerOff;
  username!: string;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCurrentLoggedUser().subscribe((data: any) => {
      this.username = data.email;
    });
  }
}
