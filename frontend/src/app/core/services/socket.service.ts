import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8080'); // URL backend connect
  }

   onOrderCreated(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('orderCreated', (data) => {
        observer.next(data);
      });
    });
  }

  onOrderUpdated(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('orderUpdated', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
