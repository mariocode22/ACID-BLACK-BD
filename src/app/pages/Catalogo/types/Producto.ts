export type Categorias =
  | "gorras"
  | "shorts"
  | "hoodies"
  | "camisetas"
  | "The lawless west"
  | "crop tops"
  | "todos"
  | "cowboys"
  | "chaquetas";


export type Genero =
  | "hombre"
  | "mujer";



export interface Producto {
  id: number;
  imagenes: string[];
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categorias; // 🔒 Solo puede ser una de las categorías válidas
  genero?: Genero

}

export interface Mural {
  titulo: String
  texto: string;
  imagen: string;
  categoria:Categorias

}


