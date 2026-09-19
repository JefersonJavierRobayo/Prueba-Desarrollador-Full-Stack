import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'catalog',
    loadComponent: () => import('./pages/catalog/catalog.page').then((m) => m.CatalogPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'order-confirmation',
    loadComponent: () => import('./pages/order-confirmation/order-confirmation.page').then((m) => m.OrderConfirmationPage),
  },
  {
    path: 'points-calculator',
    loadComponent: () => import('./pages/points-calculator/points-calculator.page').then((m) => m.PointsCalculatorPage),
  }
];