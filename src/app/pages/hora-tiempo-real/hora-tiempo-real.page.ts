import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { HoraApiService } from 'src/app/apis/hora-api';

@Component({
  selector: 'app-hora-tiempo-real',
  templateUrl: './hora-tiempo-real.page.html',
  styleUrls: ['./hora-tiempo-real.page.scss'],
  standalone: false
})
export class HoraTiempoRealPage implements OnInit, OnDestroy {
  horaActual: string = '';
  fechaActual: string = '';
  zona: string = 'America/Santiago';
  private suscripcion?: Subscription;
  private relojLocal?: Subscription;
  private horaBase: Date = new Date();

  constructor(private horaApi: HoraApiService) {}

  ngOnInit() {
    this.actualizarDesdeAPI();

    // Actualiza segundos en tiempo real (cada 1 segundo)
    this.relojLocal = interval(1000).subscribe(() => this.incrementarUnSegundo());

    //  Sincroniza con la API cada 60 segundos
    this.suscripcion = interval(60000).subscribe(() => this.actualizarDesdeAPI());
  }

  ngOnDestroy() {
    this.suscripcion?.unsubscribe();
    this.relojLocal?.unsubscribe();
  }

  //  Actualiza hora real desde la API
  private actualizarDesdeAPI() {
    this.horaApi.obtenerHora().subscribe({
      next: (hora) => {
        this.horaBase = hora;
        this.actualizarPantalla();
      },
      error: (err) => {
        console.error('Error obteniendo hora:', err);
      }
    });
  }

  // Incrementa la hora base 1 segundo
  private incrementarUnSegundo() {
    this.horaBase = new Date(this.horaBase.getTime() + 1000);
    this.actualizarPantalla();
  }

  //  Refresca la hora mostrada
  private actualizarPantalla() {
    this.horaActual = this.horaBase.toLocaleTimeString('es-CL', { hour12: false });
    this.fechaActual = this.horaBase.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
