import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
  IonInput, IonItem, IonLabel, IonButtons, IonBackButton, 
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, 
  IonIcon,
  IonToast
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
    IonInput, IonItem, IonLabel, IonButtons, IonBackButton, 
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonIcon, IonToast,
    CommonModule, FormsModule, RouterModule
  ]
})
export class RegistroPage {
  email: string = '';
  password: string = '';

  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private router: Router) {}

  register() {
    if (this.email && this.password) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
      this.toastMessage = 'Registro exitoso';
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
        this.router.navigate(['/inicio-sesion']);
      }, 1500); // Espera 1.5 segundos antes de redirigir
    } else {
      this.toastMessage = 'Debes completar todos los campos';
      this.showToast = true;
    }
  }
}
