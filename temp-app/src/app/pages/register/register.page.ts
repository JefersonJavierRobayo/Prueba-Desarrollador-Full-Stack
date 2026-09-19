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
  IonButtons, 
  IonBackButton, 
  ToastController 
} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
    IonButton, 
    IonButtons, 
    IonBackButton
  ]
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onRegister() {
    if (!this.name || !this.email || !this.password) {
      this.showToast('Todos los campos son obligatorios');
      return;
    }

    if (!this.email.includes('@')) {
      this.showToast('Ingrese un correo válido');
      return;
    }

    if (this.password.length < 6) {
      this.showToast('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const success = this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    });

    if (success) {
      await this.showToast('Registro exitoso');
      this.router.navigate(['/catalog']);
    } else {
      this.showToast('El correo ya se encuentra registrado');
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}