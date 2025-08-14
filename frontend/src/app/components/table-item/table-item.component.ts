import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../../core/services/tables.service';

@Component({
  selector: 'app-table-item',
  standalone: true,
  imports: [],
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
})
export class TableItemComponent {
  @Input() table: any;
  @Output() onReserve = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();

  constructor(private router: Router, private tableService: TableService) {}

  toggleReserve() {
    if (this.table.isReserved) {
      this.onCancel.emit(this.table.id);
    } else {
      this.onReserve.emit(this.table.id);
    }
  }
  deleteTable(id: number) {
    if (confirm('Are you sure you want to delete this table?')) {
      this.tableService.deleteTable(id).subscribe({
        next: () => {
          console.log('Table deleted:', id);

          //this.Tables = this.Tables.filter((t) => t.id !== id);
          this.onDelete.emit(id);
        },
        error: (err) => console.error('Error deleting table', err),
      });
    }
  }

  editTable(id: number) {
    this.onEdit.emit(id);
  }
}
