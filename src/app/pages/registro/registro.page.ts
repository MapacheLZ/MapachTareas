import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 👈 Importa el Router

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage {
  email: string = '';
  password: string = '';
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private router: Router) {} // 👈 Inyectamos el Router

  register() {
    if (this.email && this.password) {
      // Obtenemos los usuarios ya registrados
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Verificamos si el correo ya existe
      const existe = usuarios.find((u: any) => u.email === this.email);
      if (existe) {
        this.toastMessage = 'El correo ya está registrado';
      } else {
        // Guardamos el nuevo usuario
        usuarios.push({ email: this.email, password: this.password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        this.toastMessage = '¡Cuenta creada exitosamente!';

        // 🔥 Redirigimos a la página de inicio de sesión después de 1 segundo
        setTimeout(() => {
          this.router.navigate(['/inicio-sesion']);
        }, 1000);
      }
    } else {
      this.toastMessage = 'Por favor completa todos los campos';
    }

    this.showToast = true;
  }
}
