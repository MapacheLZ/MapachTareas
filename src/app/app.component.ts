import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from './services/storage.service'; //  Importe la carpeta de almacenamiento, creo que asi aparece en el ppt

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private router: Router,
    private storageService: StorageService // Almacenamiento
  ) {
    // Escucha los cambios de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.verificarSesion(event.urlAfterRedirects);
      }
    });
  }

  async verificarSesion(currentUrl: string) {
    const usuarioActivo = await this.storageService.obtenerUsuario(); // Usar StorageService

    // No interferir con rutas públicas o de error
    if (
      currentUrl.includes('not-found') ||
      currentUrl.includes('registro') ||
      currentUrl.includes('recuperacion')
    ) {
      return;
    }

    if (usuarioActivo) {
      // Evita que vuelva a inicio o login si ya está logueado
      if (currentUrl === '/' || currentUrl === '/inicio' || currentUrl === '/inicio-sesion') {
        this.router.navigate(['/alarmas']);
      }
    } else {
      // No permitir entrar a alarmas o tareas sin sesión
      if (currentUrl.includes('/alarmas') || currentUrl.includes('/tareas')) {
        this.router.navigate(['/inicio-sesion']);
      }
    }
  }

  async cerrarSesion() {
    await this.storageService.eliminarUsuario(); // 👈 Eliminamos sesión con Storage
    console.log('Sesión cerrada');
    this.router.navigate(['/inicio-sesion']);
  }
}
