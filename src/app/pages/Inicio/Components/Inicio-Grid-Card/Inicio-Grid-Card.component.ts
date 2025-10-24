import { ChangeDetectionStrategy, Component, Input, signal, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Categorias } from '../../../Catalogo/types/Producto';

@Component({
  selector: 'Inicio-grid-card',
  templateUrl: './Inicio-Grid-Card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioGridCardComponent implements OnInit, OnDestroy {

  mostrarTexto = signal(false);
  isVisible = signal(false);

  @Input({ required: true }) nombre!: string;
  @Input({ required: true }) imagen!: string;

  private observer?: IntersectionObserver;
  private readonly el = inject(ElementRef);
  private readonly router = inject(Router);

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
            this.isVisible.set(true);
            this.mostrarTexto.set(true);
          } else {
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
    // Mapear el nombre de la card a la categoría correspondiente
    const categoriaMap: Record<string, Categorias> = {
      'THE LAWLESST WEST': 'The lawless west',
      'CROP TOPS': 'crop tops',
      'CAMISETAS': 'camisetas',
      'GORRAS': 'gorras',
      'HOODIES': 'hoodies',
      'CHAQUETAS': 'chaquetas'
    };

    const categoria = categoriaMap[this.nombre] || 'todos';

    // Navegar al catálogo con el parámetro de categoría
    this.router.navigate(['/catalogo'], {
      queryParams: { categoria }
    });
  }
}
