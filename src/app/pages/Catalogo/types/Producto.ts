export type Categorias =
  | "gorras"
  | "hoodies"
  | "camisetas"
  | "The lawless west"
  | "crop tops"
  | "todos"
  | "nuevo"
  | "conjuntos"
  | "prendas inferiores"
  | "cowboys"
  | "chaquetas";

export type Genero = "hombre" | "mujer";

// ✅ CAMBIO PRINCIPAL: categorias ahora es un array
export interface Producto {
  id: number;
  imagenes: string[]; // Array de URLs (vendrá de la tabla imagenes_producto)
  nombre: string;
  descripcion: string;
  precio: number;
  categorias: Categorias[]; // 🔥 Array de categorías
  genero?: Genero;
}

// Mural sigue igual (una sola categoría por mural)
export interface Mural {
  titulo: string;
  texto: string;
  imagen: string;
  categoria: Categorias;
}
