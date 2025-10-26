import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service'; // 

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
  standalone: false,
})
export class RecuperacionPage {
  email: string = '';
  nuevaPassword: string = '';
  paso: 'buscar' | 'restablecer' = 'buscar'; // controla la vista

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private storageService: StorageService // 
  ) {}

  //  Verifica si el correo existe
  async buscarCuenta() {
    const cuentas = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = cuentas.find((u: any) => u.email === this.email);

    if (usuario) {
      this.paso = 'restablecer'; // mostrar el campo de nueva contraseña
    } else {
      this.mostrarAlerta('Correo no encontrado', 'No existe una cuenta registrada con ese correo.');
    }
  }

  //  Guarda la nueva contraseña y actualiza la sesión en Storage
  async restablecerPassword() {
    if (!this.nuevaPassword.trim()) {
      this.mostrarAlerta('Campo vacío', 'Por favor ingresa una nueva contraseña.');
      return;
    }

    const cuentas = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = cuentas.findIndex((u: any) => u.email === this.email);

    if (index !== -1) {
      // Actualiza la contraseña
      cuentas[index].password = this.nuevaPassword;
      localStorage.setItem('usuarios', JSON.stringify(cuentas));

      // Actualiza la sesión persistente (si el usuario estaba guardado)
      const usuarioActivo = await this.storageService.obtenerUsuario();
      if (usuarioActivo === this.email) {
        await this.storageService.guardarUsuario(this.email);
      }

      // Muestra mensaje de éxito
      const alert = await this.alertCtrl.create({
        header: 'Contraseña restablecida',
        message: 'Tu contraseña ha sido actualizada correctamente.',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => this.router.navigate(['/inicio-sesion']),
          },
        ],
      });
      await alert.present();
    } else {
      this.mostrarAlerta('Error', 'No se pudo actualizar la contraseña.');
    }
  }

  irAInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
