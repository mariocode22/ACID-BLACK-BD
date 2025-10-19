import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Catalogo-Product-Card',
  templateUrl: './Catalogo-Product-Card.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoProductCardComponent implements OnInit, OnDestroy {
  // Controla animaciones de entrada
  public isVisible = signal(false);

  // Signals de datos del producto
  imagenes = signal<string[]>([]);
  nombre = signal('');
  descripcion = signal('');
  precio = signal(0);
  categoria = signal('');

  // Control del carrusel
  currentImageIndex = signal(0);

  private observer?: IntersectionObserver;
  private readonly host = inject(ElementRef<HTMLElement>);

  // Computed para saber si hay múltiples imágenes
  hasMultipleImages = computed(() => this.imagenes().length > 1);

  ngOnInit(): void {
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  // Detección de visibilidad (animaciones)
  private setupScrollAnimation(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.isVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => this.isVisible.set(entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 1] }
    );

    this.observer.observe(this.host.nativeElement);
  }

  // Navegación del carrusel
  nextImage(): void {
    const images = this.imagenes();
    if (images.length > 1) {
      this.currentImageIndex.set((this.currentImageIndex() + 1) % images.length);
    }
  }

  prevImage(): void {
    const images = this.imagenes();
    if (images.length > 1) {
      const newIndex = this.currentImageIndex() - 1;
      this.currentImageIndex.set(newIndex < 0 ? images.length - 1 : newIndex);
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex.set(index);
  }

  // Inputs reactivos
  @Input() set setImagenes(value: string | string[]) {
    if (Array.isArray(value)) {
      this.imagenes.set(value);
    } else if (value) {
      this.imagenes.set([value]);
    } else {
      this.imagenes.set([]);
    }
    this.currentImageIndex.set(0); // Reset al cambiar imágenes
  }

  @Input() set setNombre(value: string) {
    this.nombre.set(value);
  }

  @Input() set setDescripcion(value: string) {
    this.descripcion.set(value);
  }

  @Input() set setPrecio(value: number) {
    this.precio.set(value);
  }

  @Input() set setCategoria(value: string) {
    this.categoria.set(value);
  }

  // Precio formateado (COP)
  get precioFormateado(): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(this.precio());
  }

  // Generador de link dinámico de WhatsApp
  get whatsappLink(): string {
    const numero = '573006593211';
    const baseUrl = `https://wa.me/${numero}`;

    // Obtener la primera imagen del array
    const primeraImagen = this.imagenes()[0];

    // Construir URL completa de la imagen
    const urlImagenCompleta = primeraImagen
      ? `${window.location.origin}${primeraImagen}`
      : '';

    const mensaje = encodeURIComponent(
      `Hola, estoy interesado en este producto:\n\n` +
        `• Nombre: ${this.nombre()}\n` +
        `• Categoría: ${this.categoria()}\n` +
        `• Precio: ${this.precioFormateado}` +
        (this.descripcion() ? `\n• Descripción: ${this.descripcion()}` : '') +
        (urlImagenCompleta ? `\n\n Ver imagen: ${urlImagenCompleta}` : '')
    );

    return `${baseUrl}?text=${mensaje}`;
  }
}
