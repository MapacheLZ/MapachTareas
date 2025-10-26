import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage {
  nombreUsuario: string = '';
  fotoPerfil: string | null = null;

  constructor(private storageService: StorageService) {}

  async ionViewWillEnter() {
    const datos = await this.storageService['_storage']?.get('perfil');
    if (datos) {
      this.nombreUsuario = datos.nombre || '';
      this.fotoPerfil = datos.foto || null;
    }
  }

  async tomarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt, // permite elegir cámara o galería
      });

      this.fotoPerfil = imagen.dataUrl!;
      this.guardarPerfil();
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async guardarPerfil() {
    const datos = { nombre: this.nombreUsuario, foto: this.fotoPerfil };
    await this.storageService['_storage']?.set('perfil', datos);
    console.log('Perfil guardado correctamente ✅');
  }
}
