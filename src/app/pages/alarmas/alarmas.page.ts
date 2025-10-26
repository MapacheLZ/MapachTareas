import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { Subscription, interval } from 'rxjs';
import { HoraApiService } from 'src/app/apis/hora-api';
import { AlarmasService, Alarma } from 'src/app/services/alarmas.service'; //  Importa tu servicio actualizado

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.page.html',
  styleUrls: ['./alarmas.page.scss'],
  standalone: false,
  animations: [
    // animación general de entrada al cargar la lista
    trigger('listaAnimada', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          stagger(80, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          stagger(50, [
            animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(50px)' }))
          ])
        ], { optional: true })
      ])
    ]),
    // animación para el botón agregar
    trigger('botonPulse', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pulsado', style({ transform: 'scale(1.1)' })),
      transition('normal <=> pulsado', animate('150ms ease-in-out'))
    ])
  ]
})
export class AlarmasPage implements OnInit, OnDestroy {
  alarmas: Alarma[] = [];
  nuevaHora = '';
  nuevoTitulo = '';
  botonEstado = 'normal';
  private verificador?: Subscription;

  constructor(
    private horaApi: HoraApiService,
    private alarmasService: AlarmasService //  inyectamos el servicio
  ) {}

  async ngOnInit() {
    //  Carga inicial de alarmas guardadas
    this.alarmas = await this.alarmasService.obtenerAlarmas();

    //  Inicia verificación cada 15 segundos
    this.verificador = interval(15000).subscribe(() => {
      this.horaApi.obtenerHora().subscribe({
        next: (horaActual) => this.verificarAlarmas(horaActual),
        error: (err) => console.error('Error obteniendo hora:', err)
      });
    });
  }

  ngOnDestroy() {
    this.verificador?.unsubscribe();
  }

  //  Agregar una nueva alarma
  async agregarAlarma() {
    if (!this.nuevaHora || !this.nuevoTitulo.trim()) return;

    const nueva: Alarma = {
      id: Date.now(),
      hora: this.nuevaHora,
      titulo: this.nuevoTitulo,
      activa: true,
      favorita: false //  nueva propiedad
    };

    await this.alarmasService.agregarAlarma(nueva);
    this.alarmas = await this.alarmasService.obtenerAlarmas();
    this.nuevaHora = '';
    this.nuevoTitulo = '';
    this.pulseBoton();
  }

  //  Eliminar una alarma
  async eliminarAlarma(id: number) {
    await this.alarmasService.eliminarAlarma(id);
    this.alarmas = await this.alarmasService.obtenerAlarmas();
  }

  //  Activar / Desactivar una alarma
  async toggleAlarma(alarma: Alarma) {
    alarma.activa = !alarma.activa;
    await this.alarmasService.guardarAlarmas(this.alarmas);
  }

  //  Marcar o desmarcar como favorita
  async marcarFavorito(id: number) {
    await this.alarmasService.alternarFavorito(id);
    this.alarmas = await this.alarmasService.obtenerAlarmas();
  }

  //  Efecto visual para el botón
  pulseBoton() {
    this.botonEstado = 'pulsado';
    setTimeout(() => (this.botonEstado = 'normal'), 200);
  }

  //  Verifica si una alarma coincide con la hora actual
  private verificarAlarmas(horaActual: Date) {
    const horaString = horaActual.toTimeString().slice(0, 5); // "HH:MM"
    for (const alarma of this.alarmas) {
      if (alarma.activa && alarma.hora === horaString) {
        this.sonarAlarma(alarma);
      }
    }
  }

  //  Reproduce sonido de alarma
  private sonarAlarma(alarma: Alarma) {
    console.log('🔔 ¡Alarma activada!', alarma);
    const audio = new Audio('assets/sonido.mp3');
    audio.play();
    alarma.activa = false; // desactiva después de sonar
    this.alarmasService.guardarAlarmas(this.alarmas);
  }
}
