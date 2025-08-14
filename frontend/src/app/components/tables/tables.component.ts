import { Component, OnInit } from '@angular/core';
import { TableService, TableItem } from '../../core/services/tables.service';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { CommonModule } from '@angular/common';
import { TableItemComponent } from '../table-item/table-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, TableItemComponent, FormsModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit {
  Tables: TableItem[] = [];
  loading = true;

  menuTab: 'NotReserved' | 'Reserved' = 'NotReserved';

  // สำหรับ Add Table modal
  showAddTableModal = false;
  newTableNumber = '';
  newChairQuantity: number = 0;
  selectedTableFile?: File;

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables() {
    this.tableService.getTables().subscribe((data) => {
      this.Tables = data;
      setTimeout(() => (this.loading = false), 500);
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

  // Reserve / Cancel Reserve
  reserve(tableId: number) {
    this.tableService.reserveTable(tableId).subscribe({
      next: () => this.loadTables(),
      error: (err) => alert(err.error?.error || 'Reserve failed'),
    });
  }

  cancelReserve(tableId: number) {
    this.tableService.cancelReserveTable(tableId).subscribe({
      next: () => this.loadTables(),
      error: (err) => alert(err.error?.error || 'Cancel failed'),
    });
  }

  // Modal Add Table
  openAddTableModal() {
    this.showAddTableModal = true;
  }

  closeAddTableModal() {
    this.showAddTableModal = false;
    this.newTableNumber = '';
    this.newChairQuantity = 0;
    this.selectedTableFile = undefined;
  }

  onTableFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedTableFile = event.target.files[0];
    }
  }

  addTable() {
    const tableData: Partial<TableItem> = {
      numberTable: this.newTableNumber,
      chairQuantity: this.newChairQuantity
    };

    this.tableService.createTable(tableData, this.selectedTableFile).subscribe({
      next: (res) => {
        console.log('Table created:', res);
        this.closeAddTableModal();
        this.loadTables(); // โหลดตารางใหม่หลังสร้าง
      },
      error: (err) => console.error('Error creating table', err)
    });
  }
}
