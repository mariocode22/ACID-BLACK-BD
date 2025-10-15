export type Categoria =
  | "gorras"
  | "shorts"
  | "cowboys"
  | "camisetas"
  | "pantalones"
  | "chaquetas";

export interface Producto {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria; // 🔒 Solo puede ser una de las categorías válidas
}
