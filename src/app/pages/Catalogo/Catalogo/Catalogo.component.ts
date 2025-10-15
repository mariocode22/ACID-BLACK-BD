import { ChangeDetectionStrategy, Component,signal } from '@angular/core';
import { Producto } from '../types/Producto';
import { CatalogoProductCardComponent } from '../Components/Catalogo-Product-Card/Catalogo-Product-Card.component';

@Component({
  selector: 'catalogo',
  imports: [CatalogoProductCardComponent],
  templateUrl: './Catalogo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
})
export class CatalogoComponent {

   productos = signal<Producto[]>([
    {
      id: 1,
      imagen: './referencias/camiseta.jpg',
      nombre: 'camista',
      descripcion: 'Descripción breve del producto 1',
      precio: 60000,
      categoria:"camisetas"
    },
    {
      id: 2,
      imagen: './referencias/shorts.jpg',
      nombre: 'shorts',
      descripcion: 'Descripción breve del producto 2',
      precio: 12000,
      categoria:"shorts"
    },
    {
      id: 3,
      imagen: './referencias/gorra.jpg',
      nombre: 'gorra',
      descripcion: 'Descripción breve del producto 3',
      precio: 45000,
      categoria:"gorras"
    }
  ]);

}
