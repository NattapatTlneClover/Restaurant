import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { FoodItem } from './foods.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8080'); // URL backend connect
  }

  onOrderCreated(): Observable<any> {
    return new Observable((observer) => {
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

  onMenuUpdated(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('menuUpdated', (data) => {
        observer.next(data);
      });
    });
  }

  emitMenuUpdated(menu: FoodItem) {
    this.socket.emit('menuUpdated', menu);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
