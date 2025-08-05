// food.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FoodItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  isSignature: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private apiUrl = 'http://localhost:8080/menu-items';

  constructor(private http: HttpClient) {}

  getFoods(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.apiUrl);
  }
}
