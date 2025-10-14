import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InicioGridCardComponent } from '../Components/Inicio-Grid-Card/Inicio-Grid-Card.component';

@Component({
  selector: 'Inicio-grid',
  imports: [InicioGridCardComponent],
  templateUrl: './Inicio-Grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioGridComponent {
  private allCategorias = [
    { nombre: 'CAMISETAS', imagen: 'referencias/camisetas.jpg' },
    { nombre: 'SHORTS', imagen: 'referencias/shorts.jpg' },
    { nombre: 'CAMISETAS', imagen: 'modelos/modelo3.jpg' },
    { nombre: 'OVERSIZE', imagen: 'modelos/modelo4.jpg' },
    { nombre: 'CLASSIC', imagen: 'modelos/modelo5.jpg' },
    { nombre: 'URBAN', imagen: 'modelos/modelo6.jpg' },
  ];

  // Inicialmente solo 3 categorías
  categorias = signal(this.allCategorias.slice(0, 3));

  constructor() {
    // Carga progresiva del resto
    setTimeout(() => {
      this.categorias.set([...this.allCategorias]);
    }, 500);
  }
}
