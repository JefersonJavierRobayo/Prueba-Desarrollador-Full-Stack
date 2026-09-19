export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  imageUrl?: string;
  quantity?: number; // <-- Agrega esta línea
}
