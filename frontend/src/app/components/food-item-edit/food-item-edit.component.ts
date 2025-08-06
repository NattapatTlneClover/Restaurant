import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService, FoodItem } from '../../core/services/foods.service';
import { SocketService } from '../../core/services/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-item-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './food-item-edit.component.html',
  styleUrl: './food-item-edit.component.css',
})
export class FoodItemEditComponent {
  @Input() food!: FoodItem;
  isOpen = false;
  selectedFile?: File;

  // Temp var
  editName!: string;
  editPrice!: number;
  editCategory!: string;
  editDescription!: string;
  editIsAvailable!: boolean;
  editIsSignature!: boolean;

  constructor(
    private foodService: FoodService,
    private socketService: SocketService
  ) {}

  openPopup() {
    this.isOpen = true;

    //copy value from food to keep it in Temp var
    this.editName = this.food.name;
    this.editPrice = this.food.price;
    this.editCategory = this.food.category;
    this.editDescription = this.food.description ?? '';
    this.editIsAvailable = this.food.isAvailable;
    this.editIsSignature = this.food.isSignature;
  }

  closePopup() {
    this.isOpen = false;
    this.selectedFile = undefined;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  saveEdit() {
    // Temp value update real food before subscribe
    this.food.name = this.editName;
    this.food.price = this.editPrice;
    this.food.category = this.editCategory;
    this.food.description = this.editDescription;
    this.food.isAvailable = this.editIsAvailable;
    this.food.isSignature = this.editIsSignature;

    this.foodService.updateFood(this.food, this.selectedFile).subscribe({
      next: (res: any) => {
        console.log('Update success', res);
        this.isOpen = false;
        this.selectedFile = undefined;

        // force bust cache ทันที
        this.food.updatedAt = Date.now();

        // emit ให้หน้า list รับ
        this.socketService.emitMenuUpdated(res.menuItem);
      },
      error: (err) => {
        console.error('Update failed', err);
      },
    });
  }
  onLoaded(event: any) {
    console.log('loaded', event.target.src);
  }
}
