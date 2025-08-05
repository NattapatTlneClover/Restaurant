import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule, Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService, CartItem } from '../../core/services/cart.service';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterModule,
    FooterComponent,
    CurrencyPipe,
    CommonModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: CartItem[] = [];
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders = this.cartService.getItems();
  }

  deleteItem(menuItemId: number) {
    this.cartService.removeItem(menuItemId);
    this.loadOrders();
  }

  placeOrder() {
    const storedTableId = localStorage.getItem('tableId');
    const tableId = storedTableId ? +storedTableId : null;

    if (!tableId) {
      alert('กรุณา login ก่อนทำรายการ');
      this.router.navigate(['/login']);
      return;
    }

    if (tableId) {
      this.cartService.createOrder(tableId).subscribe({
        next: (res) => {
          const orderGroupId = res.order_group_id;
          localStorage.setItem(
            `orderGroupId_${tableId}`,
            orderGroupId.toString()
          );
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.loadOrders();
        },
        error: (err) => {
          alert('Failed to place order: ' + err.message);
        },
      });
    } else {
      alert('Table ID not found, please login again.');
    }
  }
}
