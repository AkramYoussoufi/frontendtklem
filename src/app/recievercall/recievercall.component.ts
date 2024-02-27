import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { WebsocketService } from '../service/socket/websocket.service';
import { RecieverService } from '../service/api/reciever.service';
import { AuthService } from '../service/api/auth.service';
import { Router } from '@angular/router';
import { Environement } from 'src/Environement';

@Component({
  selector: 'app-reciever',
  templateUrl: './recievercall.component.html',
  styleUrls: ['./recievercall.component.scss'],
  providers: [MessageService],
})
export class RecieverCallComponent implements OnInit {
  faGear = faGear;
  isPlaying: boolean = false;
  audio!: HTMLAudioElement;
  myFormation: string = '';
  entitys: { name: string; formationName: string }[] = [];
  private webSocket: WebSocket;
  constructor(
    private recieverService: RecieverService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.audio = new Audio();
    this.audio.src = 'skype_call.mp3';
    this.audio.loop = true; // Enable looping
    this.webSocket = new WebSocket(Environement.URL_SOCKET + 'socket');
  }

  ngOnInit(): void {
    this.authService.checkJWT().subscribe((data: any) => {
      if (data.role == 'ADMIN') {
        this.router.navigate(['/dashboard']);
      } else if (data.role != 'RECIEVER') {
        this.router.navigate(['/auth']);
      }
    });
    this.recieverService.getCurrentReciever().subscribe(
      (data: any) => {
        this.myFormation = data.message;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Initiative de configuration réussie',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Echec',
          detail: "Échec de l'initiative de configuration",
        });
      }
    );
    this.webSocket.onmessage = (event: any) => {
      console.log(JSON.parse(event.data));
      console.log(this.myFormation);
      if (this.myFormation == JSON.parse(event.data).formationName) {
        this.entitys = [...this.entitys, JSON.parse(event.data)];
        this.playAudio();
      }
      this.cdr.detectChanges();
    };
  }

  close(index: number) {
    this.entitys = this.entitys.filter((entity, i) => i !== index);
    console.log(this.entitys);
    if (this.entitys.length == 0) {
      this.stopAudio();
    }
  }

  playAudio() {
    this.audio.play();
    this.isPlaying = true;
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }
}
