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

  // Computed para productos filtrados
  readonly productosFiltrados = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const lista = this.productos();

    if (categoria === 'todos') {
      return this.ordenarProductos(lista);
    }

    const filtrados = lista.filter(p => p.categoria === categoria);
    return this.ordenarProductos(filtrados);
  });

  // FIXED: Computed que siempre retorna un mural único por categoría
  readonly muralActual = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const listaMurales = this.muralesData();

    console.log('🎯 Categoría seleccionada:', categoria);

    if (categoria === 'todos') {
      const mural = listaMurales[0];
      console.log('📸 Mostrando mural TODOS:', mural?.titulo);
      // Crear objeto con timestamp único para forzar cambio
      return {
        ...mural,
        _timestamp: Date.now()
      };
    }

    const muralEncontrado = listaMurales.find(m => m.categoria === categoria);
    const muralFinal = muralEncontrado || listaMurales[0];

    console.log('📸 Mostrando mural:', muralFinal?.titulo, '| Categoría:', muralFinal?.categoria);

    // Crear objeto con timestamp único para forzar cambio
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
      console.log('✅ Efecto disparado - Categoría:', categoria, '| Mural:', mural?.titulo);
    });
  }

  ngOnInit(): void {
    this.productosService.cargarProductos();
    console.log('🚀 Catálogo inicializado');
  }

  // FIXED: Método mejorado con mejor timing
  onCategoriaSeleccionada(categoria: string | Categorias): void {
    console.log('🔄 Cambiando a categoría:', categoria);

    // Actualizar categoría
    this.categoriaSeleccionada.set(categoria as Categorias);

    // Esperar a que Angular actualice el DOM antes del scroll
    setTimeout(() => {
      this.scrollInteligente();
    }, 150); // Aumentado a 150ms para dar tiempo al render
  }

  private scrollInteligente(): void {
    const isMobile = window.innerWidth < 768;
    const targetId = isMobile ? 'mural-section' : 'productos-grid';
    const element = document.getElementById(targetId);

    if (element) {
      // Offset para sticky navbar
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

  private ordenarProductos<T extends { genero?: string }>(productos: T[]): T[] {
    return [...productos].sort((a, b) => {
      if (a.genero === b.genero) return 0;
      if (!a.genero) return 1;
      if (!b.genero) return -1;
      return a.genero === 'mujer' ? -1 : 1;
    });
  }

  contarProductos(categoria: Categorias): number {
    if (categoria === 'todos') return this.productos().length;
    return this.productos().filter(p => p.categoria === categoria).length;
  }
}
