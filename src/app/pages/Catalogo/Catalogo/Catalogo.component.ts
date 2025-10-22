import { ChangeDetectionStrategy, Component, computed, signal, OnInit, effect } from '@angular/core';
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
  productos = productosSignal;

  // Convertir murales a signal si no lo es
  private muralesData = signal(murales());

  // Signal para categoría seleccionada
  categoriaSeleccionada = signal<Categorias>('todos');

  // Computed para productos filtrados
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

  // Computed que devuelve siempre una nueva referencia del mural
  muralActual = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const listaMurales = this.muralesData();

    console.log('🎯 Categoría seleccionada:', categoria);

    if (categoria === 'todos') {
      const mural = listaMurales[0];
      console.log('📸 Mostrando mural TODOS:', mural?.titulo);
      return { ...mural }; // Nueva referencia
    }

    const muralEncontrado = listaMurales.find(m => m.categoria === categoria);
    const muralFinal = muralEncontrado || listaMurales[0];

    console.log('📸 Mostrando mural:', muralFinal?.titulo);

    return { ...muralFinal }; // Nueva referencia siempre
  });

  // Computed para validar si hay productos
  tieneProductos = computed(() => this.productosFiltrados().length > 0);

  constructor(private productosService: ProductosService) {
    // Effect para debugging - detecta cambios de categoría
    effect(() => {
      const categoria = this.categoriaSeleccionada();
      const mural = this.muralActual();
      console.log('✅ Cambio detectado - Categoría:', categoria, '| Mural:', mural?.titulo);
    });
  }

  ngOnInit() {
    this.productosService.cargarProductos();
    console.log('🚀 Catálogo inicializado');
  }

  // MEJORADO: Método que maneja el cambio de categoría y scroll inteligente
  onCategoriaSeleccionada(categoria: string | Categorias) {
    console.log('🔄 Cambiando a categoría:', categoria);

    // Actualizar categoría
    this.categoriaSeleccionada.set(categoria as Categorias);

    // Scroll inteligente según el dispositivo
    this.scrollToMuralEnMovil();
  }

  // NUEVO: Scroll mejorado especialmente para móvil
  private scrollToMuralEnMovil() {
    // Detectar si es móvil (ancho < 768px)
    const esMobile = window.innerWidth < 768;

    setTimeout(() => {
      if (esMobile) {
        // En móvil: scroll al mural para ver el cambio
        const muralElement = document.getElementById('mural-section');
        if (muralElement) {
          muralElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          console.log('📱 Scroll a mural en móvil');
        }
      } else {
        // En desktop: scroll a productos (comportamiento original)
        const productosElement = document.getElementById('productos-grid');
        if (productosElement) {
          productosElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          console.log('💻 Scroll a productos en desktop');
        }
      }
    }, 100);
  }

  // Método original para mantener compatibilidad
  private scrollToProducts() {
    setTimeout(() => {
      const element = document.querySelector('.grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  contarProductos(categoria: Categorias): number {
    if (categoria === 'todos') return this.productos().length;
    return this.productos().filter(p => p.categoria === categoria).length;
  }
}
