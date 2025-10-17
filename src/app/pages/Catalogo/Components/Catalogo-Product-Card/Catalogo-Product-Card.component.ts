import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  ElementRef,
  OnInit,
  OnDestroy,
  inject
} from '@angular/core';

@Component({
  selector: 'Catalogo-Product-Card',
  templateUrl: './Catalogo-Product-Card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoProductCardComponent implements OnInit, OnDestroy {
  // Controla animaciones de entrada
  public isVisible = signal(false);

  // Signals de datos del producto
  imagen = signal('');
  nombre = signal('');
  descripcion = signal('');
  precio = signal(0);
  categoria = signal('');

  private observer?: IntersectionObserver;
  private readonly host = inject(ElementRef<HTMLElement>);

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

  //  Inputs reactivos
  @Input() set setImagen(value: string) {
    this.imagen.set(value);
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

  //  Generador de link dinámico de WhatsApp
  get whatsappLink(): string {
    const numero = '573006593211';
    const baseUrl = `https://wa.me/${numero}`;

    const urlImagen = this.imagen()
      ? `${window.location.origin}${this.imagen()}`
      : '';

    const mensaje = encodeURIComponent(
      `Hola, estoy interesado en este producto:\n\n` +
      `• Nombre: ${this.nombre()}\n` +
      `• Categoría: ${this.categoria()}\n` +
      `• Precio: ${this.precioFormateado}\n` +
      (this.descripcion() ? `• Descripción: ${this.descripcion()}\n` : '') +
      (urlImagen ? `Imagen: ${urlImagen}` : '')
    );

    return `${baseUrl}?text=${mensaje}`;
  }
}
