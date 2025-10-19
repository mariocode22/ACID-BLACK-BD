import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Categorias } from '../types/Producto';
import { CatalogoProductCardComponent } from '../Components/Catalogo-Product-Card/Catalogo-Product-Card.component';
import { FooterComponent } from '../../../common/Footer/Footer/Footer.component';
import { CatalogoNavBarComponent } from '../Catalogo-NavBar/Catalogo-NavBar.component';
import { CatalogoMuralComponent } from '../Catalogo-Mural/Catalogo-Mural.component';
import { productos } from '../data/Catalogo-Productos';
import { murales } from '../data/Catalogo-Mural';

@Component({
  selector: 'catalogo',
  standalone: true,
  imports: [
    CatalogoProductCardComponent,
    FooterComponent,
    CatalogoNavBarComponent,
    CatalogoMuralComponent
  ],
  templateUrl: './Catalogo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoComponent {
  productos = productos;
  murales = murales;

  // ✅ Ahora tipado estrictamente con Categorias
  categoriaSeleccionada = signal<Categorias>('todos');

  productosFiltrados = computed(() => {
    const categoria = this.categoriaSeleccionada();
    let lista = this.productos();

    // Filtrar por categoría (excepto 'todos')
    if (categoria !== 'todos') {
      lista = lista.filter(p => p.categoria === categoria);
    }

    // Ordenar por género: mujer primero, luego hombre, luego sin género
    return [...lista].sort((a, b) => {
      if (a.genero === b.genero) return 0;
      if (!a.genero) return 1;
      if (!b.genero) return -1;
      return a.genero === 'mujer' ? -1 : 1;
    });
  });

  muralActual = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const listaMurales = this.murales();

    // Si es 'todos', usar el primer mural (default)
    if (categoria === 'todos') {
      return listaMurales[0];
    }

    // Buscar mural correspondiente a la categoría
    const muralEncontrado = listaMurales.find(m => m.categoria === categoria);

    // Si no hay mural para esa categoría, usar el primero como fallback
    return muralEncontrado || listaMurales[0];
  });

 onCategoriaSeleccionada(categoria: string | Categorias) {
  this.categoriaSeleccionada.set(categoria as Categorias);
  this.scrollToProducts();
}

  private scrollToProducts() {
    // Pequeño delay para que la animación sea más suave
    setTimeout(() => {
      const element = document.querySelector('.grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // ✅ Helper: Contar productos por categoría (útil para badges)
  contarProductos(categoria: Categorias): number {
    if (categoria === 'todos') {
      return this.productos().length;
    }
    return this.productos().filter(p => p.categoria === categoria).length;
  }

  // ✅ Helper: Verificar si hay productos en la categoría actual
  tieneProductos = computed(() => this.productosFiltrados().length > 0);
}
