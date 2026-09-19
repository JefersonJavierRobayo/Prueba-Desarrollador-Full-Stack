import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonButton, 
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonButton, 
    IonIcon
  ]
})
export class OrderConfirmationPage implements OnInit {
  orderId: string | null = null;
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    addIcons({ 'checkmark-circle-outline': checkmarkCircleOutline });
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (this.orderId) {
      this.order = this.orderService.getOrderById(this.orderId);
    }
  }

  goToCatalog() {
    this.router.navigate(['/catalog']);
  }
}