import { ChangeDetectionStrategy, Component, Input, signal, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'Catalogo-Product-Card',
  templateUrl: './Catalogo-Product-Card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoProductCardComponent implements OnInit, OnDestroy {

  // Signal para controlar la animación del borde
  public isVisible = signal(false);

  // Signals de datos
  imagen = signal('');
  nombre = signal('');
  descripcion = signal('');
  precio = signal(0);
  categoria = signal('');

  private observer?: IntersectionObserver;
  private readonly el = inject(ElementRef);

  ngOnInit(): void {
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    // Limpieza del observer
    this.observer?.disconnect();
  }

  setupScrollAnimation(): void {
    // Verificación para SSR y soporte del navegador
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.isVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // ✅ CLAVE: Actualizar el signal cada vez que cambia la visibilidad
          if (entry.isIntersecting) {
            // Cuando entra al viewport
            this.isVisible.set(true);
          } else {
            // Cuando sale del viewport
            this.isVisible.set(false);
          }
        });
      },
      {
        // Ajusta el threshold según prefieras
        threshold: 0.2, // Se activa cuando el 20% es visible
        // rootMargin: '0px' // Puedes agregar margen si quieres que anime antes/después
      }
    );

    // NO desconectamos el observer, lo dejamos observando continuamente
    this.observer.observe(this.el.nativeElement);
  }

  // Inputs con setters
  @Input() set setImagen(value: string) { this.imagen.set(value); }
  @Input() set setNombre(value: string) { this.nombre.set(value); }
  @Input() set setDescripcion(value: string) { this.descripcion.set(value); }
  @Input() set setPrecio(value: number) { this.precio.set(value); }
  @Input() set setCategoria(value: string) { this.categoria.set(value); }

  get precioFormateado(): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(this.precio());
  }
}
