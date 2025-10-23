import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
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
export class InicioCarruselComponent implements OnInit {
  private allProducts = [
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1760921824/Wings-Classic1_yfxxd0.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761087433/THE_ACIDS_V2_2_mamkrr.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1760921816/Nube-Acida2_wnwz2u.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761261475/nuevo_cfdtxq.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761163831/necromancer_buzo_2_emxkgy.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1760921813/Dead-Girl1_twoezc.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761091336/cowboy_mujer2_bmtism.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761088360/chaquetaV2_1_ihjcz6.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761260435/modelo5_imc7mk.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761084991/acid_bloody_soul_2_p1yf0t.jpg' },
    { image: 'https://res.cloudinary.com/djkktgn0g/image/upload/v1761262861/ACID_LOST_STREET_edcsok.jpg' },


  ];

  // Inicialmente solo 3 productos
  products = signal(this.allProducts.slice(0, 3));

  responsiveOptions = [
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
  ];

  ngOnInit(): void {
    // Carga progresiva después de 1s
    setTimeout(() => {
      this.products.set([...this.allProducts]);
    }, 1000);
  }
}
