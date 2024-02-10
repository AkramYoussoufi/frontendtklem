import {Component} from '@angular/core';
import { faUser, faAngleDown,faBell,faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser = faUser;
  faAngleDown = faAngleDown;
  faBell = faBell;
  faPowerOff=faPowerOff;

}
