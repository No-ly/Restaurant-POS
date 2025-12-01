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

export interface IngredienteProducto {
  id: number;
  nombre: string;
  precio_extra: number;
  cantidad_default: number;
  es_modificable: boolean;
  es_default: boolean;
  seleccionado?: boolean; // Para el frontend
}

export interface ProductoPersonalizado extends Producto {
  especificaciones?: string;
  ingredientesPersonalizados?: IngredienteProducto[];
}

export interface ItemCocina {
  id_producto: number;
  nombre_producto: string;
  cantidad: number;
  especificaciones: string;
  estado_preparacion: string;
}

export interface PedidoCocina {
  id: number;
  mesa: string;
  fecha: string;
  fecha_formateada: string;
  total: number;
  estado: string;
  items: ItemCocina[];
}

// Agregar estas interfaces en api.interface.ts
export interface VentaReciente {
  id: number;
  mesa: string;
  total: number;
  fecha: string;
  fecha_formateada: string;
  mesero: string;
}

export interface ReporteDiario {
  totalVentas: number;
  cantidadPedidos: number;
  ticketPromedio: number;
  ultimasVentas: VentaReciente[];
}

