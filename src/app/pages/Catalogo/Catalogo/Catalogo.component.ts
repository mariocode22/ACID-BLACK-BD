import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  OnInit,
  effect,
  inject,
  ChangeDetectorRef
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
  private readonly cdr = inject(ChangeDetectorRef);

  readonly productos = productosSignal;
  private readonly muralesData = signal(murales());

  // 🔥 FORZAR inicio en "todos"
  readonly categoriaSeleccionada = signal<Categorias>('todos');

  // 🔥 COMPUTED con compatibilidad cross-browser
  readonly productosFiltrados = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const lista = this.productos();

    // Validación de datos
    if (!Array.isArray(lista)) {
      console.warn('⚠️ Lista de productos no es un array');
      return [];
    }

    console.log('\n🔍 === FILTRANDO PRODUCTOS ===');
    console.log('📂 Categoría: "' + categoria + '"');
    console.log('📦 Total productos en BD: ' + lista.length);

    if (categoria === 'todos') {
      console.log('✅ Mostrando TODOS los productos');
      console.log('📊 Resultado: ' + lista.length + ' productos');
      console.log('=================================\n');
      return this.ordenarProductos(lista);
    }

    // Filtrado compatible con todos los navegadores
    const filtrados = lista.filter(function(producto) {
      // Validación de categorías
      if (!producto || !producto.categorias) {
        return false;
      }

      // Asegurar que categorias sea un array
      const cats = Array.isArray(producto.categorias)
        ? producto.categorias
        : [producto.categorias];

      // Usar indexOf para máxima compatibilidad
      const tieneCategoria = cats.indexOf(categoria) !== -1;

      if (tieneCategoria) {
        console.log('  ✓ "' + producto.nombre + '" → categorías: [' + cats.join(', ') + ']');
      }

      return tieneCategoria;
    });

    console.log('📊 Resultado: ' + filtrados.length + ' productos filtrados');
    console.log('=================================\n');

    return this.ordenarProductos(filtrados);
  });

  // 🔥 MURAL con compatibilidad mejorada
  readonly muralActual = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const listaMurales = this.muralesData();

    console.log('🎯 Categoría seleccionada: ' + categoria);

    let muralFinal;

    // ASEGURAR que "todos" tome el primer mural
    if (categoria === 'todos') {
      muralFinal = listaMurales[0];
      console.log('📸 Mostrando mural TODOS (índice 0): ' + (muralFinal ? muralFinal.titulo : 'N/A'));
    } else {
      // Búsqueda compatible
      muralFinal = null;
      for (let i = 0; i < listaMurales.length; i++) {
        if (listaMurales[i].categoria === categoria) {
          muralFinal = listaMurales[i];
          break;
        }
      }

      // Fallback
      if (!muralFinal) {
        muralFinal = listaMurales[0];
      }

      console.log('📸 Mostrando mural: ' + (muralFinal ? muralFinal.titulo : 'N/A') + ' | Categoría: ' + (muralFinal ? muralFinal.categoria : 'N/A'));
    }

    // Validación adicional
    if (!muralFinal) {
      console.error('❌ No se encontró mural para: ' + categoria);
      muralFinal = listaMurales[0];
    }

    // Crear objeto compatible con todos los navegadores
    const timestamp = Date.now() + Math.random();

    return {
      titulo: muralFinal.titulo,
      texto: muralFinal.texto,
      imagen: muralFinal.imagen,
      categoria: muralFinal.categoria,
      _timestamp: timestamp
    };
  });

  readonly tieneProductos = computed(() => {
    return this.productosFiltrados().length > 0;
  });

  // 🔥 CONTADOR compatible con todos los navegadores
  readonly contadorProductos = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const lista = this.productos();

    let total = 0;

    // Validación
    if (!Array.isArray(lista)) {
      console.warn('⚠️ productos() no es un array');
      return 0;
    }

    if (categoria === 'todos') {
      total = lista.length;
    } else {
      // Contar manualmente para compatibilidad
      for (let i = 0; i < lista.length; i++) {
        const producto = lista[i];
        if (producto && producto.categorias) {
          const cats = Array.isArray(producto.categorias)
            ? producto.categorias
            : [producto.categorias];

          if (cats.indexOf(categoria) !== -1) {
            total = total + 1;
          }
        }
      }
    }

    console.log('📊 Contador - Categoría: ' + categoria + ' | Total: ' + total);

    return total;
  });

  constructor() {
    effect(() => {
      const categoria = this.categoriaSeleccionada();
      const mural = this.muralActual();
      const cantidad = this.productosFiltrados().length;
      console.log('\n✅ Estado actual:');
      console.log('   Categoría: ' + categoria);
      console.log('   Productos: ' + cantidad);
      console.log('   Mural: ' + (mural ? mural.titulo : 'N/A') + '\n');

      // Forzar detección de cambios en Chrome
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    // PASO 1: Cargar productos
    this.productosService.cargarProductos();

    // PASO 2: FORZAR categoría "todos"
    console.log('\n🚀 INICIANDO catálogo...');
    console.log('📍 Categoría inicial: ' + this.categoriaSeleccionada());

    this.categoriaSeleccionada.set('todos');

    console.log('📍 Categoría forzada a: ' + this.categoriaSeleccionada());
    console.log('🎯 Mural inicial: ' + this.muralActual().titulo);
    console.log('📦 Productos cargados: ' + this.productos().length);

    // PASO 3: Limpiar URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true
    });

    // PASO 4: Query params
    const self = this;
    const subscription = this.route.queryParams.subscribe(function(params) {
      const categoria = params['categoria'];

      if (categoria && categoria !== 'todos') {
        console.log('🔗 Query param detectado: ' + categoria);

        setTimeout(function() {
          console.log('🔄 Aplicando categoría desde URL: ' + categoria);
          self.onCategoriaSeleccionada(categoria);
        }, 500);
      }

      subscription.unsubscribe();
    });
  }

  onCategoriaSeleccionada(categoria: string | Categorias): void {
    console.log('\n🔄 Cambiando categoría...');
    console.log('   De: ' + this.categoriaSeleccionada());
    console.log('   A: ' + categoria);

    this.categoriaSeleccionada.set(categoria as Categorias);

    // Forzar detección de cambios
    this.cdr.markForCheck();

    const self = this;
    setTimeout(function() {
      self.scrollInteligente();
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

      console.log((isMobile ? '📱' : '💻') + ' Scroll a ' + (isMobile ? 'mural' : 'productos'));
    }
  }

  private ordenarProductos<T extends { genero?: string }>(productos: T[]): T[] {
    // Usar slice() para clonar el array (compatible con todos los navegadores)
    const copia = productos.slice(0);

    // Sort con función explícita
    return copia.sort(function(a, b) {
      if (a.genero === b.genero) return 0;
      if (!a.genero) return 1;
      if (!b.genero) return -1;
      return a.genero === 'mujer' ? -1 : 1;
    });
  }

  contarProductos(categoria: Categorias): number {
    const lista = this.productos();

    if (categoria === 'todos') {
      console.log('📊 Contando TODOS: ' + lista.length);
      return lista.length;
    }

    let count = 0;
    for (let i = 0; i < lista.length; i++) {
      const p = lista[i];
      if (p && p.categorias) {
        const cats = Array.isArray(p.categorias) ? p.categorias : [p.categorias];
        if (cats.indexOf(categoria) !== -1) {
          count = count + 1;
        }
      }
    }

    console.log('📊 Contando "' + categoria + '": ' + count);
    return count;
  }

  // NUEVO: Método para debugging
  debugProductos(): void {
    console.log('\n🔍 DEBUG DE PRODUCTOS:');
    console.log('═══════════════════════════════════════');

    const productos = this.productos();
    console.log('📦 Total productos: ' + productos.length + '\n');

    const categorias: Categorias[] = [
      'todos', 'camisetas', 'gorras', 'The lawless west',
      'crop tops', 'chaquetas', 'conjuntos', 'nuevo',
      'prendas inferiores', 'hoodies'
    ];

    for (let i = 0; i < categorias.length; i++) {
      const cat: Categorias = categorias[i];
      const count = this.contarProductos(cat);
      console.log('   ' + cat + ': ' + count + ' productos');
    }

    console.log('\n📋 Detalle por producto:');
    for (let i = 0; i < productos.length; i++) {
      const p = productos[i];
      console.log('   ' + (i + 1) + '. ' + p.nombre);
      console.log('       Categorías: [' + (p.categorias ? p.categorias.join(', ') : 'ninguna') + ']');
    }

    console.log('═══════════════════════════════════════\n');
  }
}
