import { Component, OnInit } from '@angular/core';
import { TableService, TableItem } from '../../core/services/tables.service';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { CommonModule } from '@angular/common';
import { TableItemComponent } from '../table-item/table-item.component';
@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, TableItemComponent],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent {
  Tables: TableItem[] = [];
  loading = true;

  menuTab: 'NotReserved' | 'Reserved' = 'NotReserved';

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.getTables().subscribe((data) => {
      this.Tables = data;
      console.log(this.Tables);
      setTimeout(() => (this.loading = false), 1000);
    });
  }

  get filteredTables(): TableItem[] {
    return this.Tables.filter((table) =>
      this.menuTab === 'Reserved'
        ? table.isReserved === true
        : table.isReserved === false
    );
  }

  handleMenuTabs(tab: 'NotReserved' | 'Reserved') {
    this.menuTab = tab;
  }

  reserve(tableId: number) {
    this.tableService.reserveTable(tableId).subscribe({
      next: (res) => {
        console.log('Table reserved:', res);
        // Update local state (reload table list)
        this.tableService.getTables().subscribe((data) => (this.Tables = data));
      },
      error: (err) => {
        alert(err.error?.error || 'Reserve failed');
      },
    });
  }
  cancelReserve(tableId: number) {
    this.tableService.cancelReserveTable(tableId).subscribe({
      next: (res) => {
        console.log('Table reserved:', res);
        this.tableService.getTables().subscribe((data) => (this.Tables = data));
      },
      error: (err) => {
        alert(err.error?.error || 'Cancel failed');
      },
    });
  }
}
