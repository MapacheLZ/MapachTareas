import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { HoraApiService } from 'src/app/apis/hora-api'; //  importa tu servicio
import { Subscription, interval } from 'rxjs';

interface Alarma {
  id: number;
  hora: string;
  titulo: string;
  activa: boolean;
}

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.page.html',
  styleUrls: ['./alarmas.page.scss'],
  standalone: false,
  animations: [
    // animacion general de entrada al cargar la lista
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
// animacion para el boton agregar
    trigger('botonPulse', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pulsado', style({ transform: 'scale(1.1)' })),
      transition('normal <=> pulsado', animate('150ms ease-in-out'))
    ])
  ]
})
export class AlarmasPage implements OnInit {
  alarmas: Alarma[] = [];
  nuevaHora = '';
  nuevoTitulo = '';
  botonEstado = 'normal';
  private verificador?: Subscription;

  constructor(private horaApi: HoraApiService) {}

  ngOnInit() {
    const guardadas = localStorage.getItem('alarmas');
    if (guardadas) this.alarmas = JSON.parse(guardadas);

    // Inicia verificacion cada 15 segundos
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

  agregarAlarma() {
    if (!this.nuevaHora || !this.nuevoTitulo.trim()) return;

    const nueva: Alarma = {
      id: Date.now(),
      hora: this.nuevaHora,
      titulo: this.nuevoTitulo,
      activa: true
    };

    this.alarmas.push(nueva);
    this.guardar();
    this.nuevaHora = '';
    this.nuevoTitulo = '';
    this.pulseBoton();
  }

  eliminarAlarma(id: number) {
    this.alarmas = this.alarmas.filter(a => a.id !== id);
    this.guardar();
  }

  toggleAlarma(alarma: Alarma) {
    alarma.activa = !alarma.activa;
    this.guardar();
  }

  pulseBoton() {
    this.botonEstado = 'pulsado';
    setTimeout(() => (this.botonEstado = 'normal'), 200);
  }

  private guardar() {
    localStorage.setItem('alarmas', JSON.stringify(this.alarmas));
  }

  //  Nueva funcion para comparar hora real con alarmas activas
  private verificarAlarmas(horaActual: Date) {
    const horaString = horaActual.toTimeString().slice(0, 5); // "HH:MM"
    for (const alarma of this.alarmas) {
      if (alarma.activa && alarma.hora === horaString) {
        this.sonarAlarma(alarma);
      }
    }
  }

  private sonarAlarma(alarma: Alarma) {
    console.log('🔔 ¡Alarma activada!', alarma);
    const audio = new Audio('assets/sonido.mp3');
    audio.play();
    alarma.activa = false; // desactiva después de sonar
    this.guardar();
  }
}
