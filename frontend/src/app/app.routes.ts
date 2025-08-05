// app.routes.ts
import { Routes } from '@angular/router';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './features/menu/menu.component';
import { AdminSignupComponent } from './signup/admin-signup/admin-signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TableComponent } from './features/table/table.component';
import { OrdersComponent } from './features/orders/orders.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderStatusComponent } from './features/order-status/order-status.component';
import { MenueditsComponent } from './features/menuedits/menuedits.component';
import { OrdereditsComponent } from './features/orderedits/orderedits.component';

export const routes: Routes = [
  { path: 'login-user', component: UserLoginComponent },
  { path: 'login-admin', component: AdminLoginComponent },
  { path: 'register-admin', component: AdminSignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/table', component: TableComponent },
  { path: 'admin/menuedits', component: MenueditsComponent },
  { path: 'admin/orderedits', component: OrdereditsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'amplihier', component: OrderStatusComponent },
  { path: '', redirectTo: '/login-user', pathMatch: 'full' },
  { path: '**', redirectTo: '/login-user' }, 
];
