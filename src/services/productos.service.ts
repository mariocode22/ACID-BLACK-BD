import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Producto, Categorias } from '../app/pages/Catalogo/types/Producto';

// 🔧 CONFIGURACIÓN DE SUPABASE
const supabaseUrl = 'https://jptzrfyllhoprceptowu.supabase.co'; // Reemplaza con tu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwdHpyZnlsbGhvcHJjZXB0b3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTE1ODksImV4cCI6MjA3NjcyNzU4OX0.y2pjn1lImAAfjqT9MR4B8zWYrhIax5SYP92NXTgEO9g'; // Reemplaza con tu clave

// Signal global para compartir productos entre componentes
export const productosSignal = signal<Producto[]>([]);

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * ✅ Cargar todos los productos desde Supabase
   * Incluye las imágenes desde la tabla relacionada
   */
  async cargarProductos(): Promise<void> {
    try {
      // 🔥 Usar select con JOIN para traer imágenes
      const { data, error } = await this.supabase
        .from('productos')
        .select(`
          *,
          imagenes:imagenes_producto(url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transformar datos para que coincidan con la interface Producto
      const productosTransformados = data.map(p => ({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        categorias: Array.isArray(p.categorias) ? p.categorias : [],
        genero: p.genero,
        imagenes: p.imagenes?.map((img: any) => img.url) || []
      }));

      productosSignal.set(productosTransformados as Producto[]);
      console.log('✅ Productos cargados:', productosTransformados.length);
    } catch (error) {
      console.error('❌ Error cargando productos:', error);
      productosSignal.set([]);
    }
  }

  /**
   * 🔥 NUEVO: Cargar productos por categoría
   * Busca en el array de categorías usando el operador @>
   */
  async cargarProductosPorCategoria(categoria: Categorias): Promise<void> {
    if (categoria === 'todos') {
      await this.cargarProductos();
      return;
    }

    try {
      const { data, error } = await this.supabase
        .from('productos')
        .select('*')
        .contains('categorias', [categoria]) // 🔥 Busca en el array JSONB
        .order('id', { ascending: false }); // 🔧 Cambiar a 'id'

      if (error) throw error;
      productosSignal.set(data as Producto[]);
      console.log(`✅ Productos de "${categoria}":`, data.length);
    } catch (error) {
      console.error('❌ Error filtrando productos:', error);
      productosSignal.set([]);
    }
  }

  /**
   * ➕ Insertar un nuevo producto con múltiples categorías
   */
  async insertarProducto(producto: Omit<Producto, 'id'>): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('productos')
        .insert([{
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          categorias: producto.categorias, // Array se guarda como JSONB
          imagenes: producto.imagenes,
          genero: producto.genero
        }]);

      if (error) throw error;

      console.log('✅ Producto insertado correctamente');
      await this.cargarProductos(); // Recargar lista
      return true;
    } catch (error) {
      console.error('❌ Error insertando producto:', error);
      return false;
    }
  }

  /**
   * ✏️ Actualizar un producto existente
   */
  async actualizarProducto(id: number, cambios: Partial<Producto>): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('productos')
        .update(cambios)
        .eq('id', id);

      if (error) throw error;

      console.log('✅ Producto actualizado:', id);
      await this.cargarProductos();
      return true;
    } catch (error) {
      console.error('❌ Error actualizando producto:', error);
      return false;
    }
  }

  /**
   * 🗑️ Eliminar un producto
   */
  async eliminarProducto(id: number): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('productos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('✅ Producto eliminado:', id);
      await this.cargarProductos();
      return true;
    } catch (error) {
      console.error('❌ Error eliminando producto:', error);
      return false;
    }
  }

  /**
   * 📊 Obtener contador de productos por categoría
   */
  async contarProductosPorCategoria(): Promise<Record<string, number>> {
    try {
      const { data, error } = await this.supabase
        .from('productos')
        .select('categorias');

      if (error) throw error;

      // Contar productos por categoría
      const contadores: Record<string, number> = {};

      data.forEach(producto => {
        if (Array.isArray(producto.categorias)) {
          producto.categorias.forEach((cat: string) => {
            contadores[cat] = (contadores[cat] || 0) + 1;
          });
        }
      });

      return contadores;
    } catch (error) {
      console.error('❌ Error contando productos:', error);
      return {};
    }
  }
}
