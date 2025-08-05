import { Component, HostListener } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FoodSignaturesComponent } from '../../components/food-signatures/food-signatures.component';
import { HeaderBannerComponent } from '../../components/header-banner/header-banner.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    FoodSignaturesComponent,
    HeaderBannerComponent,
    NavbarComponent,
    CommonModule,
    RouterOutlet
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  changeHeader = false;
   user = {
    displayName: 'แฟ้ม',
    photoURL: 'https://i.pravatar.cc/100?img=3'
  };
  order = [1, 2, 3];
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.changeHeader = window.scrollY >= 50;
  }
}
