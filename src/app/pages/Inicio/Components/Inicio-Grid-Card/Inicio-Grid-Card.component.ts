import { ChangeDetectionStrategy, Component, Input, signal, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'Inicio-grid-card',
  templateUrl: './Inicio-Grid-Card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioGridCardComponent implements OnInit, OnDestroy {

  mostrarTexto = signal(false);

  // Signal para la animación de scroll
  isVisible = signal(false);

  @Input({ required: true }) nombre!: string;
  @Input({ required: true }) imagen!: string;

  private observer?: IntersectionObserver;
  private readonly el = inject(ElementRef);

  ngOnInit(): void {
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  setupScrollAnimation(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.isVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // ✅ Cuando entra en vista: mostrar card Y nombre
            this.isVisible.set(true);
            this.mostrarTexto.set(true);
          } else {
            // ✅ Cuando sale de vista: ocultar card Y nombre
            this.isVisible.set(false);
            this.mostrarTexto.set(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '50px'
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  toggleMostrarTexto() {
    this.mostrarTexto.update(valor => !valor);
  }
}
