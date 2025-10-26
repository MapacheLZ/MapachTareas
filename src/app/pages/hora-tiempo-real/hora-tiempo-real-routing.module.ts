import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HoraTiempoRealPage } from './hora-tiempo-real.page';

const routes: Routes = [
  {
    path: '',
    component: HoraTiempoRealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoraTiempoRealPageRoutingModule {}
