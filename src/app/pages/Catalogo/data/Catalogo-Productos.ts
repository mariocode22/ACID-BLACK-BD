import { signal } from '@angular/core';
import type { Producto } from '../types/Producto';

export const productos = signal<Producto[]>([
  { id: 1, imagen: '/referencias/camiseta.jpg', nombre: 'Camiseta Mujer', descripcion: 'Camiseta de algodón', precio: 60000, categoria: 'camisetas', genero: 'mujer' },
  { id: 2, imagen: '/referencias/shorts.jpg', nombre: 'Shorts Hombre', descripcion: 'Shorts deportivos', precio: 12000, categoria: 'shorts', genero: 'hombre' },
  { id: 3, imagen: '/referencias/gorra.jpg', nombre: 'Gorra Mujer', descripcion: 'Gorra con diseño', precio: 45000, categoria: 'gorras', genero: 'mujer' },
  { id: 4, imagen: '/referencias/camiseta.jpg', nombre: 'Camiseta Hombre', descripcion: 'Camiseta básica', precio: 60000, categoria: 'camisetas', genero: 'hombre' },
  { id: 5, imagen: '/referencias/camiseta.jpg', nombre: 'Camiseta Sport Mujer', descripcion: 'Camiseta deportiva', precio: 60000, categoria: 'camisetas', genero: 'mujer' }
]);
