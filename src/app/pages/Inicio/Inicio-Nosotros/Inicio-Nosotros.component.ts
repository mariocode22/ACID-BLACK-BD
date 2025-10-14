import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InicioNosotrosVideoComponent } from '../Components/Inicio-Nosotros-Video/Inicio-Nosotros-Video.component';

@Component({
  selector: 'Inicio-nosotros',
  imports: [InicioNosotrosVideoComponent],
  templateUrl: './Inicio-Nosotros.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioNosotrosComponent {



 }
