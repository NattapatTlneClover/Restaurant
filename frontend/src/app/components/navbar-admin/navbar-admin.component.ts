import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  constructor(public router: Router) {}

  changeHeader = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.changeHeader = window.scrollY >= 50;
  }

  handleMenuTabs(tab: 'admin/table' | 'admin/menuedits' | 'admin/orderedits' | 'payment') {
    this.router.navigate(['/' + tab]);
  }
}
