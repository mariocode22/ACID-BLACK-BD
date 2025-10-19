import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Producto, Mural } from '../types/Producto';
import { CatalogoProductCardComponent } from '../Components/Catalogo-Product-Card/Catalogo-Product-Card.component';
import { FooterComponent } from '../../../common/Footer/Footer/Footer.component';
import { CatalogoNavBarComponent } from '../Catalogo-NavBar/Catalogo-NavBar.component';
import { CatalogoMuralComponent } from '../Catalogo-Mural/Catalogo-Mural.component';
import { productos } from '../data/Catalogo-Productos';
import { murales } from '../data/Catalogo-Mural';

@Component({
  selector: 'catalogo',
  standalone: true,
  imports: [CatalogoProductCardComponent, FooterComponent, CatalogoNavBarComponent, CatalogoMuralComponent],
  templateUrl: './Catalogo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoComponent {
  productos = productos;
  murales = murales;
  categoriaSeleccionada = signal<string>('todos');

  productosFiltrados = computed(() => {
    const categoria = this.categoriaSeleccionada();
    let lista = this.productos();
    if (categoria !== 'todos') lista = lista.filter(p => p.categoria === categoria);
    return [...lista].sort((a, b) => (a.genero === b.genero ? 0 : a.genero === 'mujer' ? -1 : 1));
  });

  muralActual = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const listaMurales = this.murales();
    if (categoria === 'todos') return listaMurales[0];
    return listaMurales.find((m: Mural) => m.categoria === categoria) || listaMurales[0];
  });

  onCategoriaSeleccionada(categoria: string) {
    this.categoriaSeleccionada.set(categoria);
  }
}
