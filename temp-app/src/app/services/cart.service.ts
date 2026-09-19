import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsKey = 'app_cart_items';
  private cartItems: CartItem[] = [];
  private cartSubject: BehaviorSubject<CartItem[]>;

  cart$;

  constructor() {
    this.cartItems = this.getCartFromStorage();
    this.cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
    this.cart$ = this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    const existingIndex = this.cartItems.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      this.cartItems[existingIndex].quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  private saveCart(): void {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  private getCartFromStorage(): CartItem[] {
    const data = localStorage.getItem(this.cartItemsKey);
    return data ? JSON.parse(data) : [];
  }
}