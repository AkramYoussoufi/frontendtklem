import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  public connect(): void {
    this.socket.connect();
  }

  public sendMessage(code: string, message: string): void {
    this.socket.emit('send-message', { code, message });
  }

  public getMessage(entity: string): any {
    return this.socket.fromEvent(entity);
  }
}
