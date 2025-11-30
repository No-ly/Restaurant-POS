export interface Categoria {
  id: number;
  nombre: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  rol: string;
}

export interface Ingrediente {
  id: number;
  nombre: string;
  precio_extra: number;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen_url: string | null;
  area_cocina: string | null;
  id_categoria: number;
  categoria_nombre: string;
}

export interface PedidoItem {
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  especificaciones: string;
}

export interface PedidoRequest {
  id_usuario: number;
  mesa: string;
  total: number;
  items: PedidoItem[];
}

// ... interfaces existentes ...

export interface CartItem {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  especificaciones?: string;
  subtotal: number;
}

export interface OrderState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}
