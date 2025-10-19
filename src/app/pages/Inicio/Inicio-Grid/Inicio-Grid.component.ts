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
    { nombre: 'THE LAWLESST WEST', imagen: 'referencias/cowboy2.jpg' },
    { nombre: 'CROP TOPS', imagen: 'referencias/crop-tops.jpg' },
    { nombre: 'CAMISETAS', imagen: 'modelos/modelo3.jpg' },
    { nombre: 'GORRAS', imagen: 'referencias/gorras.jpg' },
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
