import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
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
  // Signal input - más reactivo que @Input tradicional
  mural = input.required<Mural>();

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
}
