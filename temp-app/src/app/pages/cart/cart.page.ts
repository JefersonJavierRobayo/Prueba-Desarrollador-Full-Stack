import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonButtons, 
  IonBackButton, 
  IonCard, 
  IonCardContent, 
  IonIcon, 
  ToastController 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonButton, 
    IonButtons, 
    IonBackButton, 
    IonCard, 
    IonCardContent, 
    IonIcon
  ]
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private toastController: ToastController
  ) {
    // Registrar ícono de la papelera para componentes Standalone
    addIcons({ trash });
  }

  ngOnInit() {
    // Escucha la lista de productos agregados y calcula el total
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  async checkout() {
    // Validar si el usuario no está autenticado -> Redirigir a Login (/home)
    if (!this.authService.isAuthenticated()) {
      await this.showToast('Debe iniciar sesión para completar la compra.');
      this.router.navigate(['/home']);
      return;
    }

    if (this.cartItems.length === 0) {
      await this.showToast('El carrito está vacío.');
      return;
    }

    // Obtener usuario actual asegurando un identificador válido
    const user = this.authService.getCurrentUser();
    const userId = user?.id ?? 'INVITADO';

    // Finalizar compra y navegar a la confirmación
    const order = this.orderService.createOrder(userId, this.cartItems, this.total);
    this.cartService.clearCart();

    this.router.navigate(['/order-confirmation'], {
      queryParams: { orderId: order.id }
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}