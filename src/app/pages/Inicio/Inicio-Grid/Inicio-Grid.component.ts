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
    { nombre: 'THE LAWLESST WEST', imagen: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761090823/modelo-cowboy3_bghlyh.jpg' },
    { nombre: 'CROP TOPS', imagen: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761260767/crop-tops_by0n7g.jpg' },
    { nombre: 'CAMISETAS', imagen: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761261010/camisetas1_kossvh.jpg' },
    { nombre: 'GORRAS', imagen: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761260781/gorras_hccgol.jpg' },
    { nombre: 'HOODIES', imagen: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761260580/hoodies_a19byk.jpg' },
    { nombre: 'CHAQUETAS', imagen: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761089522/chaquetaV2_2_v0joly.jpg' },
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
