import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonIcon,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cart, calculator, logOut, cartOutline, addOutline, removeOutline } from 'ionicons/icons';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonButtons,
    IonIcon
  ]
})
export class CatalogPage implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService,
    private toastController: ToastController
  ) {
    // Registra todos los íconos necesarios para la vista y las acciones
    addIcons({
      cart,
      calculator,
      'log-out': logOut,
      'cart-outline': cartOutline,
      'add-outline': addOutline,
      'remove-outline': removeOutline
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      // Garantiza que cada producto inicialice su cantidad en 0 si no la trae la API
      this.products = data.map(p => ({
        ...p,
        quantity: p.quantity || 0
      }));
    });
  }

  async addToCart(product: Product) {
    // Asigna la cantidad explícitamente para actualizar el estado del objeto en la vista
    product.quantity = 1;

    this.cartService.addToCart(product);

    const toast = await this.toastController.create({
      message: `${product.name} agregado al carrito`,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  increaseQuantity(product: Product) {
    product.quantity = (product.quantity || 0) + 1;
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: Product) {
    if (product.quantity && product.quantity > 0) {
      product.quantity--;
      if (typeof this.cartService.removeFromCart === 'function') {
        // Pasa el ID del producto al servicio
        this.cartService.removeFromCart(product.id);
      }
    }
  }
}
