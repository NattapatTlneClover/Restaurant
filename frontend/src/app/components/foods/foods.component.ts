import { Component, OnInit } from '@angular/core';
import { FoodService, FoodItem } from '../../core/services/foods.service';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { FoodItemComponent } from '../food-item/food-item.component';
import { CommonModule } from '@angular/common';

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

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data;
      console.log(this.foods);
      setTimeout(() => (this.loading = false), 1000);
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
}
