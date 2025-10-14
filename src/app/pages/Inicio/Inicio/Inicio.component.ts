import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InicioCarruselComponent } from '../Inicio-Carrusel/Inicio-Carrusel.component';
import { InicioGridComponent } from '../Inicio-Grid/Inicio-Grid.component';
import { InicioNosotrosComponent } from '../Inicio-Nosotros/Inicio-Nosotros.component';

@Component({
  selector: 'Inicio',
  imports: [InicioCarruselComponent,InicioGridComponent,InicioNosotrosComponent],
  templateUrl: './Inicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent { }
