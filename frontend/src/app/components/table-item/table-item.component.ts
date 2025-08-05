import { Component, Input,Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-item',
  standalone: true,
  imports: [],
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css'
})
export class TableItemComponent {
@Input() table: any;
@Output() onReserve = new EventEmitter<number>();
@Output() onCancel = new EventEmitter<number>();

  constructor(private router: Router) {}

    toggleReserve() {
    if (this.table.isReserved) {
      this.onCancel.emit(this.table.id);
    } else {
      this.onReserve.emit(this.table.id);
    }
  }
}
