import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
import { Mural } from '../types/Producto';

@Component({
  selector: 'Catalogo-mural',
  imports: [],
  standalone:true,
  templateUrl: './Catalogo-Mural.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoMuralComponent {

   @Input() mural!: Mural;
}
