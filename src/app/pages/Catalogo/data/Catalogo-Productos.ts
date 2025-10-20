import { signal } from '@angular/core';
import type { Producto } from '../types/Producto';

// Bases para rutas
const local = '/crop-tops';
const cloud = 'https://res.cloudinary.com/djkktgn0g/image/upload/v1760921824';

export const productos = signal<Producto[]>([
  {
    id: 1,
    imagenes: [`https://res.cloudinary.com/djkktgn0g/image/upload/v1760921813/Dead-Girl1_twoezc.jpg`, `https://res.cloudinary.com/djkktgn0g/image/upload/v1760921813/Dead-Girl2_gvtdfv.jpg`, `https://res.cloudinary.com/djkktgn0g/image/upload/v1760921814/Dead-Girl3_tuk0ff.jpg`],
    nombre: 'Dead Girl superstar- A Cross',
    descripcion: 'Tallas: S, M, L, XL | Colores: Negro, Blanco, Vino Tinto | Estilo: largo o corto, oversize o ajustado, con o sin mangas',
    precio: 74990,
    categoria: 'crop tops',
    genero: 'mujer',
  },
  {
    id: 2,
    imagenes: [`${cloud}/Wings-Classic1_yfxxd0.jpg`, `${cloud}/Wings-Classic2_ndpfmm.jpg`, `${cloud}/Wings-Classic3_yta1vf.jpg`],
    nombre: 'Woman flies rebel- A Wings Classic',
    descripcion: 'Tallas: todas | Colores: Negro, Blanco',
    precio: 74990,
    categoria: 'crop tops',
    genero: 'mujer',
  },
  {
    id: 3,
    imagenes: [`https://res.cloudinary.com/djkktgn0g/image/upload/v1760921820/Skull-Heart1_mbad6b.jpg`, `https://res.cloudinary.com/djkktgn0g/image/upload/v1760921821/Skull-Heart2_cfee3k.jpg`, `https://res.cloudinary.com/djkktgn0g/image/upload/v1760921822/Skull-Heart3_gq6wao.jpg`],
    nombre: 'Skull Heart',
    descripcion: 'Tallas: todas | Color: Blanco | Estilo: Crop top sin mangas, ajustado o ancho',
    precio: 74990,
    categoria: 'crop tops',
    genero: 'mujer',
  },
  {
    id: 4,
    imagenes: [`https://res.cloudinary.com/djkktgn0g/image/upload/v1760921817/rebel-Classic1_ldtctl.jpg`, `https://res.cloudinary.com/djkktgn0g/image/upload/v1760921818/rebel-Classic2_mdlwbn.jpg`, `https://res.cloudinary.com/djkktgn0g/image/upload/v1760921819/rebel-Classic3_uahcxe.jpg`],
    nombre: 'A- rebel Classic',
    descripcion: 'Camiseta básica',
    precio: 60000,
    categoria: 'crop tops',
    genero: 'mujer',
  },
  {
    id: 5,
    imagenes: [`https://res.cloudinary.com/djkktgn0g/image/upload/v1760921815/Nube-Acida1_cqbbvx.jpg`, `https://res.cloudinary.com/djkktgn0g/image/upload/v1760921816/Nube-Acida2_wnwz2u.jpg`],
    nombre: 'Nube Ácida',
    descripcion: 'Color: Blanco | Tallas: Todas | Estilo: Crop top sin mangas, disponible en ajuste pegado o ancho',
    precio: 79990,
    categoria: 'crop tops',
    genero: 'mujer',
  },
]);
