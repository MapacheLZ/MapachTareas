import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router) {
    this.verificarSesion();
  }
  verificarSesion() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');

    if (usuarioActivo) {
      this.router.navigate(['/alarmas']);
    } else {
      this.router.navigate(['/inicio-sesion']);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    console.log('Sesión cerrada');
    this.router.navigate(['/inicio-sesion']);
  }
}
