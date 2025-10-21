import { ChangeDetectionStrategy, Component, computed, signal, OnInit } from '@angular/core';
import { Categorias } from '../types/Producto';
import { CatalogoProductCardComponent } from '../Components/Catalogo-Product-Card/Catalogo-Product-Card.component';
import { FooterComponent } from '../../../common/Footer/Footer/Footer.component';
import { CatalogoNavBarComponent } from '../Catalogo-NavBar/Catalogo-NavBar.component';
import { CatalogoMuralComponent } from '../Catalogo-Mural/Catalogo-Mural.component';
import { murales } from '../data/Catalogo-Mural';
import { ProductosService } from '../../../../services/productos.service';
import { productosSignal } from '../../../../services/productos.service';

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
export class CatalogoComponent implements OnInit {
  productos = productosSignal; // Signal de productos dinámicos
  murales = murales;

  categoriaSeleccionada = signal<Categorias>('todos');

  productosFiltrados = computed(() => {
    const categoria = this.categoriaSeleccionada();
    let lista = this.productos();

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

    if (categoria === 'todos') return listaMurales[0];

    return listaMurales.find(m => m.categoria === categoria) || listaMurales[0];
  });

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    // Cargar productos desde Supabase al inicializar
    this.productosService.cargarProductos();
  }

  onCategoriaSeleccionada(categoria: string | Categorias) {
    this.categoriaSeleccionada.set(categoria as Categorias);
    this.scrollToProducts();
  }

  private scrollToProducts() {
    setTimeout(() => {
      const element = document.querySelector('.grid');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  contarProductos(categoria: Categorias): number {
    if (categoria === 'todos') return this.productos().length;
    return this.productos().filter(p => p.categoria === categoria).length;
  }

  tieneProductos = computed(() => this.productosFiltrados().length > 0);
}
