// src/app/Catalogo/data/murales.ts
import { signal } from '@angular/core';
import type { Mural } from '../types/Producto';

export const murales = signal<Mural[]>([
  {
    titulo: 'Nueva colección 666 — Acid Killer',
    texto: 'En la penumbra donde la luz se retira y los susurros son presagios, nace una nueva identidad. No es para los débiles ni para quienes buscan aprobación, sino para los que han visto la oscuridad y la han abrazado. Cada prenda no es solo tela: es un arma afilada, una promesa de caos. Está tejida con los recuerdos de un asesino, con la paciencia sádica de quien espera en silencio y con la frialdad de un bisturí que corta la carne y la mente. Aquí no hay reglas ni límites, solo la pureza del miedo que aterra a los conformistas y a quienes se esconden tras máscaras sociales. Nuestra ropa no busca vestir cuerpos, busca poseer almas.',
    imagen: '/modelos/modelo1.jpg',
    categoria: 'todos'
  },
  {
    titulo: 'Crop Tops',
    texto: '¿Verte “cute”? Error de concepto. Estas prendas no fueron hechas para adornar, sino para expresar. Nada aquí es dulce ni sumiso: todo tiene filo. Ropa con veneno para mujeres con voz. No te vistas para gustar, vístete para incomodar. Estas piezas no siguen moldes; fueron cortadas con rabia, con ideas y con intención. Son para las que prefieren la crudeza al filtro y la verdad al disfraz. No hay regla que no pueda romperse ni forma que no pueda reinventarse. No hay crop top que te defina mejor que tú misma.',
    imagen: '/referencias/crop-tops2.jpg',
    categoria: 'crop tops'
  },
  {
    titulo: 'The Lawless West',
    texto: 'Un forajido solitario cabalga por el desierto, cubierto de polvo y cicatrices. Viste Acid Black, dejando atrás un mundo de leyes podridas y promesas vacías. No busca redención, viene a incendiar las reglas. "The Lawless West" reinterpreta el viejo oeste desde la mirada de los marginados: renegados modernos que no obedecen a ningún sheriff, iglesia ni bandera. Visten de negro no por moda, sino como acto de resistencia. Camisa curtida, calavera al pecho, pantalón clásico y botas listas para correr o pelear. Cada prenda es una declaración: no pertenezco, y no me pueden domar.',
    imagen: '/referencias/west.jpg',
    categoria: 'The lawless west'
  },
  {
    titulo: 'Camisetas',
    texto: 'No es solo una camiseta. Es un grito visual, una declaración de guerra a lo común. Quien lleva una Acid Black no busca encajar… rompe el molde, se ríe de la norma, camina entre sombras con orgullo. Porque vestir oscuro no es esconderse, es revelar lo que otros temen mostrar. Cada prenda es resistencia tejida en algodón, una pieza que vibra con la energía del inconformismo. No sigue tendencias, las quema. No busca aprobación, la desafía. Acid Black no viste cuerpos, viste almas rebeldes: las que caminan solas, las que arden sin permiso, las que encuentran belleza en el caos y libertad en la oscuridad.',
    imagen: '/referencias/camisetas.jpg',
    categoria: 'camisetas'
  },
  {
    titulo: 'Gorras',
    texto: 'Comodidad sin perder actitud. Nuestras gorras combinan resistencia y estilo, acompañándote en cada movimiento y en cada mirada desafiante. Diseñadas para durar, pensadas para destacar, cada pieza impone presencia sin pedir permiso. No solo cubres tu cabeza: declaras tu identidad. Estas gorras son para quienes caminan sin miedo, para los que desafían lo común y buscan marcar su camino. Porque en Acid Black, cada accesorio es un arma de estilo y rebeldía.',
    imagen: '/referencias/gorras.jpg',
    categoria: 'gorras'
  }
]);
