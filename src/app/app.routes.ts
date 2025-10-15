import { Routes } from '@angular/router';
import { InicioComponent } from './pages/Inicio/Inicio/Inicio.component';
import { CatalogoComponent } from './pages/Catalogo/Catalogo/Catalogo.component';

export const routes: Routes = [

  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: '**',
    redirectTo: "inicio"
  },
];
