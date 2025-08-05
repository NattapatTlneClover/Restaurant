import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [],
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.css',
})
export class QuantitySelectorComponent {
  @Input() quantity = 1;
  @Output() quantityChange = new EventEmitter<number>();

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  increment() {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }
}
