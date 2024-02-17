import { Component, OnInit } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'],
})
export class SidenavbarComponent implements OnInit {
  faGear = faGear;
  faUsers = faUsers;
  faUserClock = faUserClock;
  faUserGraduate = faUserGraduate;
  faFileMedicalAlt = faFileMedicalAlt;

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Gestion des utilisateurs',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Admin',
            icon: 'pi pi-briefcase',
          },
          {
            label: 'Parent',
            icon: 'pi pi-fw pi-user',
          },
          {
            label: 'Recepteur',
            icon: 'pi pi-fw pi-qrcode',
          },
          {
            label: 'Reciever',
            icon: 'pi pi-fw pi-wifi',
          },
        ],
      },
      {
        label: "En attente d'approbation",
        icon: 'pi pi-fw pi-hourglass',
      },
      {
        label: 'Les Étudiantes',
        icon: 'pi pi-fw pi-book',
      },
      {
        label: 'Les Classes',
        icon: 'pi pi-fw pi-book',
      },
    ];
  }
}
