import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service'; // 

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

  constructor(
    private router: Router,
    private storageService: StorageService // 
  ) {}

  async register() {
    //  Validaciones iniciales
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

    //  Obtenemos los usuarios ya registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verificamos si el correo ya existe
    const existe = usuarios.find((u: any) => u.email === this.email);
    if (existe) {
      this.toastMessage = 'El correo ya está registrado';
    } else {
      //  Guardamos el nuevo usuario localmente (para compatibilidad)
      usuarios.push({ email: this.email, password: this.password });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      //  Guardamos el usuario activo usando Ionic Storage
      await this.storageService.guardarUsuario(this.email);

      this.toastMessage = '¡Cuenta creada exitosamente!';

      //  Redirigimos a la página principal (alarmas) después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/alarmas']);
      }, 1000);
    }

    this.showToast = true;
  }

  // Validar formato de correo electrónico
  esCorreoValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
