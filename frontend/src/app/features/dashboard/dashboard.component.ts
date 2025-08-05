import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(public router: Router) {}

  changeHeader = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.changeHeader = window.scrollY >= 50;
  }

  handleMenuTabs(tab: 'table' | 'menu' | 'order' | 'payment') {
    this.router.navigate(['/' + tab]);
  }
}
