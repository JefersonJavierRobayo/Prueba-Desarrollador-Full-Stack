import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  ToastController 
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton
  ]
})
export class HomePage {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      await this.showToast('Por favor ingrese correo y contraseña');
      return;
    }

    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/catalog']);
    } else {
      await this.showToast('Usuario no encontrado o contraseña incorrecta');
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }
}