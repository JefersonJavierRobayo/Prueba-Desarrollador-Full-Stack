import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Audífonos Bluetooth Wireless',
      price: 150000,
      description: 'Cancelación de ruido activa y batería de 20 horas.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    },
    {
      id: 2,
      name: 'Smartwatch Deportivo v2',
      price: 280000,
      description: 'Monitoreo de ritmo cardíaco y GPS integrado.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    },
    {
      id: 3,
      name: 'Mochila Impermeable para Laptop',
      price: 120000,
      description: 'Compartimento acolchado para laptops de hasta 15.6 pulgadas.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}