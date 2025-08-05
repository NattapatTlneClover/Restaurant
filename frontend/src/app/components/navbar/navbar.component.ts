import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public router: Router) {}

  changeHeader = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.changeHeader = window.scrollY >= 50;
  }

  handleMenuTabs(tab: 'home' | 'menu' | 'orders' | 'amplihier' | 'payment') {
    console.log(this.router.url);
    this.router.navigate(['/' + tab]);
  }
}
