import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'Inicio-grid-card',
  templateUrl: './Inicio-Grid-Card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioGridCardComponent {

  mostrarTexto = signal(false);

  @Input({ required: true }) nombre!: string;
  @Input({ required: true }) imagen!: string;

  toggleMostrarTexto() {
    this.mostrarTexto.update(valor => !valor);
  }
}
