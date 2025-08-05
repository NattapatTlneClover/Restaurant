import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerLinks = [
    { id: 1, text: 'About Online Food' },
    { id: 2, text: 'Read our blog' },
    { id: 3, text: 'Sign up to deliver' },
    { id: 4, text: 'Add your restaurant' },
    { id: 5, text: 'Get Help' },
    { id: 6, text: 'Ask any question' },
    { id: 7, text: 'Order Now' },
    { id: 8, text: 'Contact' },
    { id: 9, text: 'Facebook' },
    { id: 10, text: 'Instagram' },
    { id: 11, text: 'Twitter' },
    { id: 12, text: 'Youtube' },
  ];
}
