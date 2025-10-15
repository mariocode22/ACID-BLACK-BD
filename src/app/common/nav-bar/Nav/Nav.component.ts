import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavMuralComponent } from '../Nav-Mural/Nav-Mural.component';
import { NavListaComponent } from '../Nav-Lista/Nav-Lista.component';

@Component({
  selector: 'Navegacion',
  imports: [NavMuralComponent,NavListaComponent],
  templateUrl: './Nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent { }
