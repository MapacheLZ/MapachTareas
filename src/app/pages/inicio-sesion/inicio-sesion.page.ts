import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  // 🔹 Método para iniciar sesión con validación real
  login() {
    if (this.email && this.password) {
      // 🔍 Cargar los usuarios registrados desde localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Buscar el usuario que coincida con email y password
      const usuario = usuarios.find(
        (u: any) => u.email === this.email && u.password === this.password
      );

      if (usuario) {
        // ✅ Inicio de sesión exitoso
        this.toastMessage = 'Inicio de sesión exitoso';
        this.showToast = true;

        // Guarda la sesión activa
        localStorage.setItem('usuarioActivo', this.email);

        // Redirige después de un pequeño delay
        setTimeout(() => {
          this.router.navigate(['/alarmas']);
        }, 1000);
      } else {
        // ❌ Usuario no encontrado o contraseña incorrecta
        this.toastMessage = 'Correo o contraseña incorrectos';
        this.showToast = true;
      }
    } else {
      this.toastMessage = 'Por favor completa todos los campos';
      this.showToast = true;
    }
  }

  // 🔹 Método para ir a la página de recuperación de contraseña
  irARecuperacion() {
    this.router.navigate(['/recuperacion']);
  }
}
