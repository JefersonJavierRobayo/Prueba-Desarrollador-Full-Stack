import { Injectable } from '@angular/core';
import { Order, CartItem } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private storageKey = 'user_orders';

  createOrder(userId: string | number, items: CartItem[], total: number): Order {
    const orders = this.getOrders();

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userId: userId,
      items: items,
      total: total,
      date: new Date().toISOString()
    };

    orders.push(newOrder);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));

    return newOrder;
  }

  getOrders(): Order[] {
    const ordersJson = localStorage.getItem(this.storageKey);
    return ordersJson ? JSON.parse(ordersJson) : [];
  }

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find(o => o.id === id);
  }
}