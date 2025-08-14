import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FoodItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  isSignature: boolean;
  imageUrl?: string;
  isAvailable: boolean;
  updatedAt: any;
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

  updateFood(food: FoodItem, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', food.name);
    formData.append('price', food.price.toString());
    formData.append('category', food.category);
    formData.append('description', food.description ?? '');
    formData.append('isAvailable', food.isAvailable ? 'true' : 'false');
    formData.append('isSignature', food.isSignature ? 'true' : 'false');

    if (file) {
      formData.append('image', file, file.name);
    }

    return this.http.put(`${this.apiUrl}/${food.id}`, formData);
  }

  createFood(food: Partial<FoodItem>, file?: File): Observable<any> {
  const formData = new FormData();
  formData.append('name', food.name ?? '');
  formData.append('price', food.price?.toString() ?? '');
  formData.append('category', food.category ?? '');
  formData.append('description', food.description ?? '');
  formData.append('isAvailable', food.isAvailable ? 'true' : 'false');
  formData.append('isSignature', food.isSignature ? 'true' : 'false');

  if (file) {
    formData.append('image', file, file.name);
  }

  return this.http.post(this.apiUrl, formData);
}

deleteMenu(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}
