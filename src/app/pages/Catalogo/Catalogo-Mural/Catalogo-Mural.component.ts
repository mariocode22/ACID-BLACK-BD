import { ChangeDetectionStrategy, Component, input, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mural } from '../types/Producto';

@Component({
  selector: 'Catalogo-mural',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Catalogo-Mural.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoMuralComponent {
  // Signal input
  mural = input.required<Mural>();

  // Signal para controlar la visibilidad del contenido
  contentVisible = signal(false);

  // Computed para validar y transformar datos
  muralData = computed(() => {
    const data = this.mural();

    // Validación de datos críticos
    if (!data?.imagen || !data?.titulo) {
      console.warn('⚠️ Datos del mural incompletos:', data);
      return null;
    }

    return data;
  });

  constructor() {
    // Effect para manejar cambios en el mural
    effect(() => {
      const mural = this.muralData();

      if (mural) {
        console.log('🖼️ Mural cargado:', mural.titulo, '| Categoría:', mural.categoria);

        // Ocultar contenido temporalmente
        this.contentVisible.set(false);

        // Mostrar contenido después de un breve delay para asegurar que la imagen cargue
        setTimeout(() => {
          this.contentVisible.set(true);
        }, 100);
      }
    });
  }

  // Método para cuando la imagen termina de cargar
  onImageLoad(): void {
    // Asegurar que el contenido sea visible cuando la imagen carga
    if (!this.contentVisible()) {
      this.contentVisible.set(true);
    }
    console.log('✅ Imagen del mural cargada completamente');
  }
}
