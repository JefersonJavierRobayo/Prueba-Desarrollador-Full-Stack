import { Product } from './product.model';


export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string | number;
  items: CartItem[];
  total: number;
  date: string | Date;
}