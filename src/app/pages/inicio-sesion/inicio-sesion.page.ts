import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service'; // 

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
  standalone: false,
})
export class InicioSesionPage {
  email: string = '';
  password: string = '';
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private router: Router,
    private storageService: StorageService // 
  ) {}

  // Método para iniciar sesión con validación real
  async login() {
    // Validaciones iniciales
    if (!this.email || !this.password) {
      this.toastMessage = 'Por favor completa todos los campos';
      this.showToast = true;
      return;
    }

    if (!this.esCorreoValido(this.email)) {
      this.toastMessage = 'Por favor ingresa un correo válido (ejemplo@correo.com)';
      this.showToast = true;
      return;
    }

    // 🔍 Cargar los usuarios registrados desde localStorage (por ahora)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Buscar el usuario que coincida con email y password
    const usuario = usuarios.find(
      (u: any) => u.email === this.email && u.password === this.password
    );

    if (usuario) {
      //  Inicio de sesión exitoso
      this.toastMessage = 'Inicio de sesión exitoso';
      this.showToast = true;

      // Guarda la sesión activa en el almacenamiento nativo
      await this.storageService.guardarUsuario(this.email);

      // Redirige después de un pequeño delay
      setTimeout(() => {
        this.router.navigate(['/alarmas']);
      }, 1000);
    } else {
      //  Usuario no encontrado o contraseña incorrecta
      this.toastMessage = 'Correo o contraseña incorrectos';
      this.showToast = true;
    }
  }

  //  Método para ir a la página de recuperación de contraseña
  irARecuperacion() {
    this.router.navigate(['/recuperacion']);
  }

  //  Validar formato de correo
  esCorreoValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
