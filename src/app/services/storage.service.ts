import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardarUsuario(usuario: any) {
    await this._storage?.set('usuarioActivo', usuario);
  }

  async obtenerUsuario() {
    return await this._storage?.get('usuarioActivo');
  }

  async eliminarUsuario() {
    await this._storage?.remove('usuarioActivo');
  }

  async limpiarTodo() {
    await this._storage?.clear();
  }
}
