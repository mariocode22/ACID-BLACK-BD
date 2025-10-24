import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  OnInit,
  effect,
  inject
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly productos = productosSignal;
  private readonly muralesData = signal(murales());

  // 🔥 FORZAR inicio en "todos"
  readonly categoriaSeleccionada = signal<Categorias>('todos');

  readonly productosFiltrados = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const lista = this.productos();

    if (categoria === 'todos') {
      return this.ordenarProductos(lista);
    }

    const filtrados = lista.filter(p =>
      p.categorias && p.categorias.includes(categoria)
    );

    return this.ordenarProductos(filtrados);
  });

  readonly muralActual = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const listaMurales = this.muralesData();

    console.log('🎯 Categoría seleccionada:', categoria);

    let muralFinal;

    // 🔥 ASEGURAR que "todos" tome el primer mural
    if (categoria === 'todos') {
      muralFinal = listaMurales[0]; // Siempre el primero
      console.log('📸 Mostrando mural TODOS (índice 0):', muralFinal?.titulo);
    } else {
      const muralEncontrado = listaMurales.find(m => m.categoria === categoria);
      muralFinal = muralEncontrado || listaMurales[0];
      console.log('📸 Mostrando mural:', muralFinal?.titulo, '| Categoría:', muralFinal?.categoria);
    }

    // Validación adicional
    if (!muralFinal) {
      console.error('❌ No se encontró mural para:', categoria);
      muralFinal = listaMurales[0];
    }

    // Crear un nuevo objeto con timestamp único para forzar re-render
    return {
      titulo: muralFinal.titulo,
      texto: muralFinal.texto,
      imagen: muralFinal.imagen,
      categoria: muralFinal.categoria,
      _timestamp: Date.now() + Math.random()
    };
  });

  readonly tieneProductos = computed(() => this.productosFiltrados().length > 0);

  constructor() {
    effect(() => {
      const categoria = this.categoriaSeleccionada();
      const mural = this.muralActual();
      const cantidad = this.productosFiltrados().length;
      console.log(`✅ Categoría: ${categoria} | Productos: ${cantidad} | Mural: ${mural?.titulo}`);
    });
  }

  ngOnInit(): void {
    // 🔥 PASO 1: Cargar productos
    this.productosService.cargarProductos();

    // 🔥 PASO 2: FORZAR categoría "todos" de forma explícita
    console.log('🚀 INICIANDO catálogo...');
    console.log('📍 Categoría ANTES:', this.categoriaSeleccionada());

    this.categoriaSeleccionada.set('todos');

    console.log('📍 Categoría DESPUÉS:', this.categoriaSeleccionada());
    console.log('🎯 Mural actual:', this.muralActual().titulo);

    // 🔥 PASO 3: Limpiar URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true
    });

    // 🔥 PASO 4: Verificar query params SOLO si vienen de navegación externa
    const subscription = this.route.queryParams.subscribe(params => {
      const categoria = params['categoria'] as Categorias;

      if (categoria && categoria !== 'todos') {
        console.log('🔗 Query param detectado:', categoria);

        // Aplicar después de que la página cargue
        setTimeout(() => {
          console.log('🔄 Aplicando categoría desde URL:', categoria);
          this.onCategoriaSeleccionada(categoria);
        }, 500);
      }

      // Cancelar suscripción después de primera ejecución
      subscription.unsubscribe();
    });
  }

  onCategoriaSeleccionada(categoria: string | Categorias): void {
    console.log('🔄 Cambiando a categoría:', categoria);

    this.categoriaSeleccionada.set(categoria as Categorias);

    setTimeout(() => {
      this.scrollInteligente();
    }, 150);
  }

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

    return this.productos().filter(p =>
      p.categorias && p.categorias.includes(categoria)
    ).length;
  }
}
