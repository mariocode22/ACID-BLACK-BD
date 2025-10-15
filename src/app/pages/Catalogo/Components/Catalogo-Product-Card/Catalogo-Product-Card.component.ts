import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'Catalogo-Product-Card',
  templateUrl: './Catalogo-Product-Card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoProductCardComponent {

  // Signals
  imagen = signal('');
  nombre = signal('');
  descripcion = signal('');
  precio = signal(0);
  categoria=signal('');

  // Inputs que actualizan los signals
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

   @Input() set setCategoria(value:string) {
    this.categoria.set(value);
  }

  // Getter para precio formateado en COP
  get precioFormateado(): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(this.precio());
  }
}
