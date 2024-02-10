import { Component } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUserClock } from '@fortawesome/free-solid-svg-icons'; 
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent {
  faGear=faGear;
  faUsers=faUsers;
  faUserClock=faUserClock;
  faUserGraduate=faUserGraduate;
  faFileMedicalAlt=faFileMedicalAlt;
}
