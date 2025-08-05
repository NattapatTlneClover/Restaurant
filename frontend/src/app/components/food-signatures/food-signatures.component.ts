import { Component, OnInit } from '@angular/core';
import { FoodService, FoodItem } from '../../core/services/foods.service';
import { CommonModule } from '@angular/common';
import { FoodSignaturesItemComponent } from '../food-signatures-item/food-signatures-item.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-food-signatures',
  standalone: true,
  imports: [CommonModule, FoodSignaturesItemComponent,SkeletonComponent],
  templateUrl: './food-signatures.component.html',
  styleUrl: './food-signatures.component.css',
})
export class FoodSignaturesComponent implements OnInit {
  foods: FoodItem[] = [];
  loading = true;

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data.filter((food) => food.isSignature === true);
      console.log(this.foods);
      setTimeout(() => (this.loading = false), 1000);
    });
  }
}
