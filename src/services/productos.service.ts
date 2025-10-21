import { Injectable, signal } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import type { Producto, Categorias, Genero } from '../app/pages/Catalogo/types/Producto';

// Signal global para almacenar productos
export const productosSignal = signal<Producto[]>([]);

@Injectable({ providedIn: 'root' })
export class ProductosService {
  constructor(private sb: SupabaseClientService) {}

  // 📋 Cargar todos los productos desde Supabase
  async cargarProductos() {
    try {
      const { data, error } = await this.sb.supabase
        .from('productos')
        .select('*, imagenes_producto(*)')
        .order('fecha_creacion', { ascending: false });

      if (error) throw error;

      const productos: Producto[] = (data || []).map((item: any) => ({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        precio: Number(item.precio),
        categoria: this.validarCategoria(item.categoria),
        genero: this.validarGenero(item.genero),
        imagenes: item.imagenes_producto?.map((img: any) => img.url) || []
      }));

      // Actualiza el signal
      productosSignal.set(productos);

    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  // 🔒 Validaciones internas
  private validarCategoria(categoria: any): Categorias {
    const categoriasValidas: Categorias[] = [
      "gorras","shorts","cowboys","camisetas","The lawless west","crop tops","todos","chaquetas"
    ];
    return categoriasValidas.includes(categoria) ? categoria : "todos";
  }

  private validarGenero(genero: any): Genero | undefined {
    const generosValidos: Genero[] = ["hombre","mujer"];
    return generosValidos.includes(genero) ? genero : undefined;
  }
}
