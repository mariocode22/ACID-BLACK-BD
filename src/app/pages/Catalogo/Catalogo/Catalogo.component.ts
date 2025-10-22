import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  OnInit,
  effect,
  inject
} from '@angular/core';
import { Categorias } from '../types/Producto';
import { CatalogoProductCardComponent } from '../Components/Catalogo-Product-Card/Catalogo-Product-Card.component';
import { FooterComponent } from '../../../common/Footer/Footer/Footer.component';
import { CatalogoNavBarComponent } from '../Catalogo-NavBar/Catalogo-NavBar.component';
import { CatalogoMuralComponent } from '../Catalogo-Mural/Catalogo-Mural.component';
import { murales } from '../data/Catalogo-Mural';
import { ProductosService, productosSignal } from '../../../../services/productos.service';

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
  private readonly productosService = inject(ProductosService);

  readonly productos = productosSignal;
  private readonly muralesData = signal(murales());
  readonly categoriaSeleccionada = signal<Categorias>('todos');

  // 🔥 CAMBIO: Filtrado con array de categorías
  readonly productosFiltrados = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const lista = this.productos();

    if (categoria === 'todos') {
      return this.ordenarProductos(lista);
    }

    // ✅ Filtrar productos que CONTENGAN la categoría en su array
    const filtrados = lista.filter(p =>
      p.categorias && p.categorias.includes(categoria)
    );

    return this.ordenarProductos(filtrados);
  });

  // Computed para el mural actual
  readonly muralActual = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const listaMurales = this.muralesData();

    console.log('🎯 Categoría seleccionada:', categoria);

    if (categoria === 'todos') {
      const mural = listaMurales[0];
      console.log('📸 Mostrando mural TODOS:', mural?.titulo);
      return {
        ...mural,
        _timestamp: Date.now()
      };
    }

    const muralEncontrado = listaMurales.find(m => m.categoria === categoria);
    const muralFinal = muralEncontrado || listaMurales[0];

    console.log('📸 Mostrando mural:', muralFinal?.titulo, '| Categoría:', muralFinal?.categoria);

    return {
      ...muralFinal,
      _timestamp: Date.now()
    };
  });

  readonly tieneProductos = computed(() => this.productosFiltrados().length > 0);

  constructor() {
    // Effect para debugging
    effect(() => {
      const categoria = this.categoriaSeleccionada();
      const mural = this.muralActual();
      const cantidad = this.productosFiltrados().length;
      console.log(`✅ Categoría: ${categoria} | Productos: ${cantidad} | Mural: ${mural?.titulo}`);
    });
  }

  ngOnInit(): void {
    this.productosService.cargarProductos();
    console.log('🚀 Catálogo inicializado');
  }

  // Método para cambiar categoría
  onCategoriaSeleccionada(categoria: string | Categorias): void {
    console.log('🔄 Cambiando a categoría:', categoria);

    // Actualizar categoría
    this.categoriaSeleccionada.set(categoria as Categorias);

    // Esperar a que Angular actualice el DOM antes del scroll
    setTimeout(() => {
      this.scrollInteligente();
    }, 150);
  }

  // Scroll inteligente según dispositivo
  private scrollInteligente(): void {
    const isMobile = window.innerWidth < 768;
    const targetId = isMobile ? 'mural-section' : 'productos-grid';
    const element = document.getElementById(targetId);

    if (element) {
      const offset = isMobile ? -80 : -100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      console.log(`${isMobile ? '📱' : '💻'} Scroll a ${isMobile ? 'mural' : 'productos'}`);
    }
  }

  // Ordenar productos (mujeres primero)
  private ordenarProductos<T extends { genero?: string }>(productos: T[]): T[] {
    return [...productos].sort((a, b) => {
      if (a.genero === b.genero) return 0;
      if (!a.genero) return 1;
      if (!b.genero) return -1;
      return a.genero === 'mujer' ? -1 : 1;
    });
  }

  // 🔥 CAMBIO: Contar productos con array de categorías
  contarProductos(categoria: Categorias): number {
    if (categoria === 'todos') return this.productos().length;

    return this.productos().filter(p =>
      p.categorias && p.categorias.includes(categoria)
    ).length;
  }
}
