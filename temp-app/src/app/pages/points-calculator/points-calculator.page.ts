import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calculator, star, gift, trophyOutline } from 'ionicons/icons';
import { PointsService, PointsCalculationResult } from '../../services/points.service';

@Component({
  selector: 'app-points-calculator',
  templateUrl: './points-calculator.page.html',
  styleUrls: ['./points-calculator.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge
  ]
})
export class PointsCalculatorPage implements OnInit {
  executedSalesAmount: number | null = null;
  executedUnits: number | null = null;
  result: PointsCalculationResult | null = null;

  constructor(
    private pointsService: PointsService,
    private toastController: ToastController
  ) {
    addIcons({ calculator, star, gift, 'trophy-outline': trophyOutline });
  }

  ngOnInit() {}

  onInputChange() {
    this.result = null;
  }
  /**
   * Se ejecuta al presionar el botón 'Calcular'
   */
  calculatePoints() {
    if ((!this.executedSalesAmount || this.executedSalesAmount <= 0) && (!this.executedUnits || this.executedUnits <= 0)) {
      this.result = null;
      this.showToast('Ingrese al menos un monto o cantidad de unidades válidas.');
      return;
    }

    this.result = this.pointsService.calculatePoints({
      executedSalesAmount: this.executedSalesAmount || 0,
      executedUnits: this.executedUnits || 0
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
