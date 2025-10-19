import { signal } from '@angular/core';
import type { Producto } from '../types/Producto';

export const productos = signal<Producto[]>([
  {
    id: 1,
    imagenes: ['/crop-tops/Dead-Girl1.jpg', '/crop-tops/Dead-Girl2.jpg', '/crop-tops/Dead-Girl3.jpg'],
    nombre: 'Dead Girl superstar- A Cross',
    descripcion: 'Tallas: S, M, L, XL | Colores: Negro, Blanco, Vino Tinto | Estilo: largo o corto, oversize o ajustado, con o sin mangas',
    precio: 74990,
    categoria: 'crop tops',
    genero: 'mujer'
  },
  {
    id: 2,
    imagenes: ['/crop-tops/Wings-Classic1.jpg', '/crop-tops/Wings-Classic2.jpg', '/crop-tops/Wings-Classic3.jpg'],
    nombre: 'Woman flies rebel- A Wings Classic ',
    descripcion: 'Tallas: todas | Colores: Negro, Blanco',
    precio: 74990,
    categoria: 'crop tops',
    genero: 'mujer'
  },
  {
    id: 3,
    imagenes: ['/crop-tops/Skull-Heart1.jpg', '/crop-tops/Skull-Heart2.jpg', '/crop-tops/Skull-Heart3.jpg'],
    nombre: 'Skull Heart',
    descripcion: 'Tallas: todas | Color: Blanco | Estilo: Crop top sin mangas, ajustado o ancho',
    precio: 74990,
    categoria: 'crop tops',
    genero: 'mujer'
  },
  {
    id: 4,
    imagenes: ['/crop-tops/rebel-Classic1.jpg', '/crop-tops/rebel-Classic2.jpg', '/crop-tops/rebel-Classic3.jpg'],
    nombre: 'A- rebel Classic',
    descripcion: 'Camiseta básica',
    precio: 60000,
    categoria: 'crop tops',
    genero: 'mujer'
  },
  {
    id: 5,
    imagenes: ['/referencias/camiseta.jpg'],
    nombre: 'Camiseta Sport Mujer',
    descripcion: 'Camiseta deportiva',
    precio: 60000,
    categoria: 'camisetas',
    genero: 'mujer'
  }
]);
