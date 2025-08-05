import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-food-signatures-item',
  standalone: true,
  imports: [],
  templateUrl: './food-signatures-item.component.html',
  styleUrl: './food-signatures-item.component.css',
})
export class FoodSignaturesItemComponent {
  @Input() food: any;
}
