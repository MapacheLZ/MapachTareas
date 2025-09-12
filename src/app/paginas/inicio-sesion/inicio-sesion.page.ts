import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButton, IonInput, IonItem, IonLabel, 
  IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonIcon,
  IonToast
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
  standalone: true,
  imports: [ 
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonButton, IonInput, IonItem, IonLabel, 
    IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonIcon,
    IonToast,
    CommonModule, FormsModule, RouterModule 
  ]
})
export class InicioSesionPage {
  email: string = '';
  password: string = '';

  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private router: Router) {}

  login() {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (this.email === savedEmail && this.password === savedPassword) {
      this.toastMessage = 'Inicio de sesión exitoso';
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
        this.router.navigate(['/opciones']);
      }, 1500);
    } else {
      this.toastMessage = 'Usuario o contraseña incorrecta';
      this.showToast = true;
    }
  }
}
