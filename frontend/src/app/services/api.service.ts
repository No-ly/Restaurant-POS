import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Categoria, Producto, Usuario, Ingrediente, PedidoRequest,  IngredienteProducto, PedidoCocina } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/productos`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.baseUrl}/ingredientes`);
  }

  createPedido(pedido: PedidoRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/pedidos`, pedido);
  }

  getPedidosPendientes(): Observable<PedidoCocina[]> {
    return this.http.get<PedidoCocina[]>(`${this.baseUrl}/pedidos/pendientes`);
  }

  completarPedido(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/pedidos/${id}/completar`, {});
  }

getProductIngredients(productId: number): Observable<IngredienteProducto[]> {
  return this.http.get<any[]>(`${this.baseUrl}/productos/${productId}/ingredientes`).pipe(
    map(ingredientesData => {
      console.log('🔧 Datos crudos de ingredientes:', ingredientesData);

      return ingredientesData.map(item => {
        // ✅ MAPEO CORRECTO según tu interfaz
        const ingrediente: IngredienteProducto = {
          id: item.id_ingrediente || item.id,
          nombre: item.nombre,
          precio_extra: Number(item.precio_extra) || 0, // ← CONVERTIR A NÚMERO
          cantidad_default: item.cantidad_default || 1, // ← Valor por defecto si no viene
          es_modificable: Boolean(item.es_modificable),
          es_default: Boolean(item.es_default),
          seleccionado: Boolean(item.es_default) // Para el frontend
        };

        console.log('🔄 Ingrediente mapeado:', ingrediente);
        return ingrediente;
      });
    })
  );
}


}
