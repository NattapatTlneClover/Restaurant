import { Component, OnInit } from '@angular/core';
import { FoodService, FoodItem } from '../../core/services/foods.service';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { FoodItemComponent } from '../food-item/food-item.component';
import { CommonModule } from '@angular/common';

import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [SkeletonComponent, FoodItemComponent, CommonModule],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css',
})
export class FoodsComponent implements OnInit {
  foods: FoodItem[] = [];
  loading = true;

  menuTab: 'food' | 'drink' | 'dessert' = 'food';

  constructor(
    private foodService: FoodService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data;
      console.log(this.foods);
      setTimeout(() => (this.loading = false), 1000);
    });

    // Subscribe event เมื่อมีการอัพเดตเมนูใหม่
    this.socketService.onMenuUpdated().subscribe((updatedItem: FoodItem) => {
      this.updateFoodList(updatedItem);
    });
  }

  get filteredFoods(): FoodItem[] {
    return this.foods.filter(
      (food) => food.category?.toLowerCase() === this.menuTab.toLowerCase()
    );
  }

  handleMenuTabs(tab: 'food' | 'drink' | 'dessert') {
    this.menuTab = tab;
  }
  private updateFoodList(updatedItem: FoodItem) {
    const index = this.foods.findIndex((f) => f.id === updatedItem.id);
    if (index !== -1) {
      // ถ้าเจอใน list ให้ update
      this.foods[index] = updatedItem;
    } else {
      // ถ้าไม่มีอยู่ก่อน ให้ push เข้า list
      this.foods.push(updatedItem);
    }
  }
}
