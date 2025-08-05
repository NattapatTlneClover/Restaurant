import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { QuantitySelectorComponent } from "../quantity-selector/quantity-selector.component";

@Component({
  selector: 'app-food-item',
  standalone: true,
  imports: [QuantitySelectorComponent],
  templateUrl: './food-item.component.html',
  styleUrl: './food-item.component.css',
})
export class FoodItemComponent {
  @Input() food: any;
  quantity: number = 1;
  constructor(private router: Router,private cartService: CartService) {}

   addToCart() {
    this.cartService.addItem({
      menuItemId: this.food.id,
      name: this.food.name,
      price: this.food.price,
      quantity: this.quantity,
    });
    alert('เพิ่มลงตะกร้าเรียบร้อยแล้ว!');
    this.quantity = 1; 
  }
}
