import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private apiUrl = 'http://localhost:8080/orders'; 

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}`, { status });
  }
}
