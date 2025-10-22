import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Catalogo-Product-Card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Catalogo-Product-Card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoProductCardComponent implements OnInit, OnDestroy {
  public isVisible = signal(false);
  imagenes = signal<string[]>([]);
  nombre = signal('');
  descripcion = signal('');
  precio = signal(0);
  categoria = signal('');
  currentImageIndex = signal(0);

  private observer?: IntersectionObserver;
  private readonly host = inject(ElementRef<HTMLElement>);
  hasMultipleImages = computed(() => this.imagenes().length > 1);

  ngOnInit(): void {
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

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

  // ==== Entradas ====
  @Input() set setImagenes(value: string | string[]) {
    if (Array.isArray(value)) {
      this.imagenes.set(value);
    } else if (value) {
      this.imagenes.set([value]);
    } else {
      this.imagenes.set([]);
    }
    this.currentImageIndex.set(0);
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

  // ==== Utilidades ====
  get precioFormateado(): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(this.precio());
  }

  // ==== Enlace de WhatsApp (string simple) ====
  get whatsappLink(): string {
    const numero = '573006593211';
    const mensaje = encodeURIComponent(
      `👋 ¡Hola! Me interesa:\n\n` +
      `📦 ${this.nombre()}\n` +
      `🏷️ ${this.categoria()}\n` +
      `💰 ${this.precioFormateado}\n\n` +
      `¿Disponible? 😊`
    );

    return `https://wa.me/${numero}?text=${mensaje}`;
  }

  // ==== Método alternativo con window.open ====
  abrirWhatsApp(): void {
    const url = this.whatsappLink;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
