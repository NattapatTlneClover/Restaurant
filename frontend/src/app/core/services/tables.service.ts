import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TableItem {
  id: number;
  numberTable: string;
  chairQuantity: number;
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

  createTable(table: Partial<TableItem>, file?: File): Observable<TableItem> {
    const formData = new FormData();
    formData.append('numberTable', table.numberTable!);
    formData.append('chairQuantity', table.chairQuantity!.toString());

    if (file) {
      formData.append('image', file, file.name);
    }

    return this.http.post<TableItem>(this.apiUrl, formData);
  }

  deleteTable(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
