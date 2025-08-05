import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';

// Web Socket
import { SocketService } from '../../core/services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [NavbarComponent, RouterModule, FooterComponent, CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css',
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  private orderUpdatedSub?: Subscription;

  constructor(
    private orderService: CartService,
    private socketService: SocketService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('OrderStatusComponent initialized');
    this.getOrders();

    this.orderUpdatedSub = this.socketService
      .onOrderUpdated()
      .subscribe((updatedOrder) => {
        console.log('Received orderUpdated event:', updatedOrder);

        const storedTableId = localStorage.getItem('tableId');
        const tableId = storedTableId ? +storedTableId : null;
        const myGroupId = localStorage.getItem(`orderGroupId_${tableId}`);

        console.log('tableId:', tableId);
        console.log('myGroupId:', myGroupId);

        if (myGroupId && +myGroupId === updatedOrder.order_group_id) {
          console.log('Order group matched, updating orders array');

          const index = this.orders.findIndex((o) => o.id === updatedOrder.id);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          } else {
            this.orders.push(updatedOrder);
          }
          this.orders = [...this.orders];

          this.cd.detectChanges();
        } else {
          console.log('Order group not matched, ignoring update');
        }
      });
  }

  ngOnDestroy(): void {
    this.orderUpdatedSub?.unsubscribe();
    // this.socketService.disconnect();
  }

  getOrders() {
    const storedTableId = localStorage.getItem('tableId');
    const tableId = storedTableId ? +storedTableId : null;

    if (!tableId) {
      console.error('tableId not found in localStorage');
      return;
    }
    const groupId = localStorage.getItem(`orderGroupId_${tableId}`);

    if (!groupId) {
      console.error(
        `orderGroupId for table ${tableId} not found in localStorage`
      );
      return;
    }

    this.orderService.getOrdersByGroup(+groupId).subscribe({
      next: (res) => {
        console.log('Initial orders fetched:', res);
        this.orders = res;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }
}
