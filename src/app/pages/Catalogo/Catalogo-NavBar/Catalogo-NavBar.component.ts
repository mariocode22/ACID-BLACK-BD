import { ChangeDetectionStrategy, Component, output, signal, input, effect } from '@angular/core';
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

  // 🔥 Input para sincronizar con el padre
  categoriaActual = input<string>('todos');

  // Signal para la categoría activa - INICIA EN "todos"
  categoriaActiva = signal<string>('todos');

  // Array normal (NO signal)
  categorias: string[] = [
    'todos',
    'camisetas',
    'gorras',
    'The lawless west',
    'crop tops',
    'chaquetas',
    'conjuntos',
    'nuevo',
    'prendas inferiores',
    'hoodies'
  ];

  constructor() {
    // 🔥 Sincronizar con el input del padre
    effect(() => {
      const categoria = this.categoriaActual();
      if (categoria) {
        this.categoriaActiva.set(categoria);
        console.log('📍 NavBar sincronizada con:', categoria);
      }
    });
  }

  // Método para seleccionar categoría
  seleccionarCategoria(categoria: string): void {
    // Evita re-renderizados si es la misma categoría
    if (categoria === this.categoriaActiva()) {
      console.log('⏸️ Ya estás en la categoría:', categoria);
      return;
    }

    console.log('🔘 NavBar - Categoría seleccionada:', categoria);
    this.categoriaActiva.set(categoria);
    this.categoriaSeleccionadaChange.emit(categoria);
  }
}
