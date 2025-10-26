import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Alarma {
  id: number;
  hora: string;
  titulo: string;
  activa: boolean;
  favorita: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  private _storage: Storage | null = null;
  private readonly KEY = 'alarmas';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //  Obtener todas las alarmas
  async obtenerAlarmas(): Promise<Alarma[]> {
    if (!this._storage) await this.init();
    return (await this._storage?.get(this.KEY)) || [];
  }

  //  Guardar todas las alarmas
  async guardarAlarmas(alarmas: Alarma[]) {
    await this._storage?.set(this.KEY, alarmas);
  }

  //  Agregar una alarma nueva
  async agregarAlarma(alarma: Alarma) {
    const alarmas = await this.obtenerAlarmas();
    alarmas.push(alarma);
    await this.guardarAlarmas(alarmas);
  }

  //  Eliminar una alarma
  async eliminarAlarma(id: number) {
    const alarmas = await this.obtenerAlarmas();
    const filtradas = alarmas.filter(a => a.id !== id);
    await this.guardarAlarmas(filtradas);
  }

  //  Alternar favorito
  async alternarFavorito(id: number) {
    const alarmas = await this.obtenerAlarmas();
    const index = alarmas.findIndex(a => a.id === id);
    if (index !== -1) {
      alarmas[index].favorita = !alarmas[index].favorita;
      await this.guardarAlarmas(alarmas);
    }
  }

  //  Obtener solo favoritos
  async obtenerFavoritos(): Promise<Alarma[]> {
    const alarmas = await this.obtenerAlarmas();
    return alarmas.filter(a => a.favorita);
  }
}
