import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'Inicio-carrusel',
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule],
  templateUrl: './Inicio-Carrusel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioCarruselComponent {


  products = [
    { image: 'modelos/modelo1.jpg' },
    { image: 'modelos/modelo2.jpg' },
    { image: 'modelos/modelo3.jpg' },
    { image: 'modelos/modelo4.jpg' },
    { image: 'modelos/modelo5.jpg' },
    { image: 'modelos/modelo7.jpg' },
    { image: 'modelos/modelo8.jpg' },
    { image: 'modelos/modelo9.jpg' },
    { image: 'modelos/modelo10.jpg' },


  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];



}
