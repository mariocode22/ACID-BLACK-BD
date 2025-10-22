import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Catalogo-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Catalogo-NavBar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoNavBarComponent {
  // Signal output (reemplaza @Output EventEmitter)
  categoriaSeleccionadaChange = output<string>();

  // Signal para la categoría activa
  categoriaActiva = signal<string>('todos');

  // Array normal (NO signal) - Solución al error
  categorias: string[] = [
    'todos',
    'camisetas',
    'gorras',
    'The lawless west',
    'crop tops',
    'chaquetas',
    'hoodies'
  ];

  // Método para seleccionar categoría
  seleccionarCategoria(categoria: string): void {
    // Evita re-renderizados si es la misma categoría
    if (categoria === this.categoriaActiva()) return;

    this.categoriaActiva.set(categoria);
    this.categoriaSeleccionadaChange.emit(categoria);
  }
}
