import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Restaurant';
  constructor(private router: Router) {}
  goToAdmin() {
    this.router.navigate(['/login-admin']);
  }
  goToUser() {
    this.router.navigate(['/login-user']);
  }
}
