import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, Producto, Usuario, Ingrediente, PedidoRequest,  IngredienteProducto } from '../interfaces/api.interface';

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

  getProductIngredients(productId: number): Observable<IngredienteProducto[]> {
    return this.http.get<IngredienteProducto[]>(`${this.baseUrl}/productos/${productId}/ingredientes`);
  }
}
