import { ChangeDetectionStrategy, Component, Input, signal, ElementRef, OnInit, OnDestroy, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    // Limpieza del observer si aún existe
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
          if (entry.isIntersecting) {
            this.isVisible.set(true);
            // Desconectar después de la primera animación
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      {
        threshold: 0.1,
        // Opcional: Agregar rootMargin para disparar antes
        // rootMargin: '50px'
      }
    );

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
      minimumFractionDigits: 0 // Opcional: Sin decimales para pesos colombianos
    }).format(this.precio());
  }
}
