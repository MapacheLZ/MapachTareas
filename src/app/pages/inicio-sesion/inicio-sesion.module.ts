import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { InicioSesionPage } from './inicio-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: InicioSesionPage
  }
];

@NgModule({
  declarations: [InicioSesionPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class InicioSesionPageModule {}
