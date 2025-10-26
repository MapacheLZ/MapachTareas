import { Component, OnInit } from '@angular/core';
import { AlarmasService, Alarma } from 'src/app/services/alarmas.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage implements OnInit {
  favoritos: Alarma[] = [];

  constructor(private alarmasService: AlarmasService) {}

  async ngOnInit() {
    this.favoritos = await this.alarmasService.obtenerFavoritos();
  }
}
