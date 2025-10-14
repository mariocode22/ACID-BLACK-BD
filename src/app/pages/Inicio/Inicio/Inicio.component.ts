import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InicioCarruselComponent } from '../Inicio-Carrusel/Inicio-Carrusel.component';
import { InicioGridComponent } from '../Inicio-Grid/Inicio-Grid.component';
import { InicioNosotrosComponent } from '../Inicio-Nosotros/Inicio-Nosotros.component';
import { InicioFooterComponent } from '../Components/inicio-Footer/inicio-Footer.component';


@Component({
  selector: 'Inicio',
  imports: [InicioCarruselComponent,InicioGridComponent,InicioNosotrosComponent,InicioFooterComponent],
  templateUrl: './Inicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent { }
