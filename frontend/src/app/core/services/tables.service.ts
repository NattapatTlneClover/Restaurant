import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TableItem {
  id: number;
  numberTable: string;
  chairQuantity: string;
  isReserved: boolean;
  imageUrl: string;
  credentialCode: string | null;
  reservedAt: string | null;
  table_id: number | null;
}

export interface TableLoginResponse {
  message: string;
  table: TableItem;
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl = 'http://localhost:8080/tables';

  constructor(private http: HttpClient) {}

  getTables(): Observable<TableItem[]> {
    return this.http.get<TableItem[]>(this.apiUrl);
  }

  reserveTable(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/reserve`, {});
  }

  cancelReserveTable(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/unreserve`, {});
  }

  credentialLogin(credentialCode: string): Observable<TableLoginResponse> {
    return this.http.post<TableLoginResponse>(
      `${this.apiUrl}/CredentialLogin`,
      {
        credentialCode: credentialCode,
      }
    );
  }
}
