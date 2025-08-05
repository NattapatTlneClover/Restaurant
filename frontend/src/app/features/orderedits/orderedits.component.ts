import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../../components/navbar-admin/navbar-admin.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { AdminOrderService } from '../../core/services/admin-order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../core/services/socket.service'; // import service socket
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orderedits',
  standalone: true,
  imports: [
    NavbarAdminComponent,
    RouterModule,
    FooterComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './orderedits.component.html',
  styleUrl: './orderedits.component.css',
})
export class OrdereditsComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  filteredOrders: any[] = [];
  selectedStatus: string = '';
  private orderCreatedSub?: Subscription;
  private orderUpdatedSub?: Subscription;

  constructor(
    private adminOrderService: AdminOrderService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.loadOrders();

    this.orderCreatedSub = this.socketService
      .onOrderCreated()
      .subscribe((newOrder) => {
        this.orders.push(newOrder);
        this.filterOrders();
      });

    this.orderUpdatedSub = this.socketService
      .onOrderUpdated()
      .subscribe((updatedOrder) => {
        const index = this.orders.findIndex((o) => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        } else {
          this.orders.push(updatedOrder);
        }
        // this.filterOrders();
        const fIndex = this.filteredOrders.findIndex(
          (o) => o.id === updatedOrder.id
        );
        if (fIndex !== -1) {
          if (
            this.selectedStatus &&
            updatedOrder.status !== this.selectedStatus
          ) {
            this.filteredOrders.splice(fIndex, 1);
          } else {
            this.filteredOrders[fIndex] = updatedOrder;
          }
        } else {
          if (
            !this.selectedStatus ||
            updatedOrder.status === this.selectedStatus
          ) {
            this.filteredOrders.push(updatedOrder);
          }
        }
         //  This forces Angular to detect the changes by creating new array references, which triggers the UI to refresh and update accordingly.**
        this.orders = [...this.orders];
        this.filteredOrders = [...this.filteredOrders];
      });
  }

  ngOnDestroy(): void {
    this.orderCreatedSub?.unsubscribe();
    this.orderUpdatedSub?.unsubscribe();
    this.socketService.disconnect();
  }

  loadOrders() {
    this.adminOrderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.filterOrders();
      },
      error: (err) => console.error(err),
    });
  }

  filterOrders() {
    if (!this.selectedStatus) {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        (o) => o.status === this.selectedStatus
      );
    }
  }

  updateStatus(order: any) {
    this.adminOrderService.updateOrderStatus(order.id, order.status).subscribe({
      next: () => {
        alert('อัปเดตสถานะเรียบร้อย');
      },
      error: (err) => alert('Error: ' + err.message),
    });
  }

  trackByItem(index: number, obj: any) {
  return obj.id;
}
}
