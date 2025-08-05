import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CartItem {
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart_items';

  constructor(private http: HttpClient) {}

  getItems(): CartItem[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  addItem(item: CartItem) {
    const items = this.getItems();
    const existing = items.find(i => i.menuItemId === item.menuItemId);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.saveItems(items);
  }

  removeItem(menuItemId: number) {
    const items = this.getItems().filter(i => i.menuItemId !== menuItemId);
    this.saveItems(items);
  }

  updateQuantity(menuItemId: number, quantity: number) {
    const items = this.getItems();
    const item = items.find(i => i.menuItemId === menuItemId);

    if (item) {
      item.quantity = quantity;
      this.saveItems(items);
    }
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
  }

  private saveItems(items: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // ฟังก์ชันยิง API สร้าง order
 createOrder(tableId: number, orderGroupId?: number): Observable<any> {
  const items = this.getItems();

  if (items.length === 0) {
    throw new Error('Cart is empty');
  }

  const payload: any = {
    tableId,
    items: items.map(item => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
    })),
  };

  if (orderGroupId !== undefined) {
    payload.orderGroupId = orderGroupId;
  }

  return this.http.post('http://localhost:8080/orders', payload);
}

// ดึง order ตาม group id
  getOrdersByGroup(orderGroupId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/orders/group/${orderGroupId}`);
  }
}
