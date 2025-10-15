import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './common/nav-bar/Nav/Nav.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavComponent],
  templateUrl: './app.html',
  standalone:true,

})
export class App {
  protected readonly title = signal('acid-black');
}
