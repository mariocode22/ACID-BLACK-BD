import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'nav-lista',
  imports: [],
  templateUrl: './Nav-Lista.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListaComponent {


  menuAbierto = signal(false);

  toggleMenu() {
    this.menuAbierto.update((valor) => !valor);
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
  }


}
