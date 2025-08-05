import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Register Admin
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/useradmin/register`, data);
  }

  //Login Admin
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/useradmin/login`, data);
  }

  logout():void {
    sessionStorage.clear();
  }

  // delete token in client
  // logout(): void {
  //   localStorage.removeItem('token');
  // }

  // check login
  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  // get token
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }
}
