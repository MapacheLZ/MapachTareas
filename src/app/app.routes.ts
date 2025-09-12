import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'alarmas',
    loadComponent: () => import('./paginas/alarmas/alarmas.page').then( m => m.AlarmasPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./paginas/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'inicio-sesion',
    loadComponent: () => import('./paginas/inicio-sesion/inicio-sesion.page').then( m => m.InicioSesionPage)
  },
  {
    path: 'opciones',
    loadComponent: () => import('./paginas/opciones/opciones.page').then( m => m.OpcionesPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./paginas/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'tareas',
    loadComponent: () => import('./paginas/tareas/tareas.page').then( m => m.TareasPage)
  },
];
