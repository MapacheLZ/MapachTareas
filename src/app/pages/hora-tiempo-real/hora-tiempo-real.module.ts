import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoraTiempoRealPageRoutingModule } from './hora-tiempo-real-routing.module';

import { HoraTiempoRealPage } from './hora-tiempo-real.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoraTiempoRealPageRoutingModule
  ],
  declarations: [HoraTiempoRealPage]
})
export class HoraTiempoRealPageModule {}
