import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService, FoodItem } from '../../core/services/foods.service';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { CommonModule } from '@angular/common';
import { FoodItemEditComponent } from '../food-item-edit/food-item-edit.component';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-foodedit',
  standalone: true,
  imports: [SkeletonComponent, CommonModule, FoodItemEditComponent],
  templateUrl: './foodedit.component.html',
  styleUrl: './foodedit.component.css',
})
export class FoodeditComponent implements OnInit, OnDestroy {
  foods: FoodItem[] = [];
  loading = true;
  menuSub: any;

  menuTab: 'food' | 'drink' | 'dessert' = 'food';

  constructor(
    private foodService: FoodService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe((data) => {
      // แปลง updatedAt (string) จาก backend ให้เป็น number
      this.foods = data.map((item) => ({
        ...item,
        updatedAt: new Date(item.updatedAt).getTime(),
      }));

      setTimeout(() => (this.loading = false), 1000);
    });

    this.menuSub = this.socketService
      .onMenuUpdated()
      .subscribe((updatedItem: FoodItem) => {
        // แปลง updatedAt socket ที่เข้ามาเป็น number เช่นกัน
        updatedItem.updatedAt = new Date(updatedItem.updatedAt).getTime();

        const index = this.foods.findIndex((f) => f.id === updatedItem.id);
        if (index !== -1) {
          this.foods[index] = updatedItem;
        } else {
          this.foods.unshift(updatedItem);
        }
        this.foods = [...this.foods];
      });
  }

  ngOnDestroy(): void {
    this.menuSub?.unsubscribe();
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
