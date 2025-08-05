import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TablesComponent } from "../../components/tables/tables.component";
import { NavbarAdminComponent } from "../../components/navbar-admin/navbar-admin.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TablesComponent, NavbarAdminComponent, RouterOutlet, FooterComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {

}
