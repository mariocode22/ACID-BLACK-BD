import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Producto2 } from '../app/pages/Catalogo/types/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private sb: SupabaseClient;

  constructor() {
    this.sb = createClient(
      'https://ttslwoueolrkhuzfwsac.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0c2x3b3Vlb2xya2h1emZ3c2FjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDkzODg1OCwiZXhwIjoyMDc2NTE0ODU4fQ.UGipZ8f3LAHM3YoV4p2JD2_0Z7m283J677Lg8urSV34'
    );
  }

  // ✅ Obtener todos los productos con sus imágenes
  async getProductos(): Promise<Producto2[]> {
    const { data, error } = await this.sb
      .from('productos')
      .select('*, imagenes_producto(*)');

    if (error) throw error;
    return data as Producto2[];
  }

  // ✅ Obtener un producto por ID
  async getProductoById(id: number): Promise<Producto2 | null> {
    const { data, error } = await this.sb
      .from('productos')
      .select('*, imagenes_producto(*)')
      .eq('id', id)
      .maybeSingle(); // obtiene solo uno

    if (error) throw error;
    return data as Producto2 | null;
  }
}
