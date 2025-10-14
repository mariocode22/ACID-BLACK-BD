import { Routes } from '@angular/router';
import { InicioComponent } from './pages/Inicio/Inicio/Inicio.component';

export const routes: Routes = [

  { path: 'inicio',
    component: InicioComponent
  },
  { path: '**',
     redirectTo:"inicio"
     },
];
