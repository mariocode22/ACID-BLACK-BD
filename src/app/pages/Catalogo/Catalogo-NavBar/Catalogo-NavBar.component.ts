import { ChangeDetectionStrategy, Component, Output, signal, EventEmitter } from '@angular/core';

@Component({
  selector: 'Catalogo-nav-bar',
  imports: [],
  standalone: true,
  templateUrl: './Catalogo-NavBar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoNavBarComponent {




  @Output() categoriaSeleccionadaChange = new EventEmitter<string>();

  categoriaActiva = signal<string>('todos');

  categorias = ['todos', 'camisetas', 'gorras', "The lawless west", "crop tops","chaquetas","hoodies"];

  seleccionarCategoria(categoria: string) {
    this.categoriaActiva.set(categoria);
    this.categoriaSeleccionadaChange.emit(categoria);
  }
}
