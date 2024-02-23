import { Component } from '@angular/core';

import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class BodyComponent {}
