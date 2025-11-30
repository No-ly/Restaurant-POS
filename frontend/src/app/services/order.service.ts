import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto, CartItem, OrderState } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly TAX_RATE = 0.16;

  private initialState: OrderState = {
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0
  };

  private orderState = new BehaviorSubject<OrderState>(this.initialState);
  public orderState$: Observable<OrderState> = this.orderState.asObservable();

  private productsMap = new Map<number, Producto>();

  constructor() {}

  addItem(product: Producto): void {
    console.log('➕ Agregando producto:', product);

    // CONVERTIR PRECIO A NÚMERO
    const precioNumerico = this.parsePrice(product.precio);

    this.productsMap.set(product.id, product);

    const currentState = this.orderState.value;
    const existingItemIndex = currentState.items.findIndex(
      item => item.id_producto === product.id
    );

    let newItems: CartItem[];

    if (existingItemIndex > -1) {
      newItems = [...currentState.items];
      const currentQuantity = newItems[existingItemIndex].cantidad;
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        cantidad: currentQuantity + 1,
        subtotal: (currentQuantity + 1) * precioNumerico
      };
      console.log('📈 Incrementando cantidad del producto:', product.nombre);
    } else {
      const newItem: CartItem = {
        id_producto: product.id,
        nombre: product.nombre,
        precio: precioNumerico, // Usar precio convertido a número
        cantidad: 1,
        especificaciones: '',
        subtotal: precioNumerico
      };
      newItems = [...currentState.items, newItem];
      console.log('🆕 Nuevo producto agregado:', product.nombre);
    }

    this.updateState(newItems);
  }

  addQuantity(productId: number): void {
    console.log('🔍 Buscando producto para agregar cantidad:', productId);
    const product = this.productsMap.get(productId);

    if (product) {
      console.log('✅ Producto encontrado, agregando:', product.nombre);
      this.addItem(product);
    } else {
      console.error('❌ Producto no encontrado en el mapa:', productId);
    }
  }

  removeItem(productId: number): void {
    console.log('➖ Removiendo cantidad del producto:', productId);

    const currentState = this.orderState.value;
    const existingItemIndex = currentState.items.findIndex(
      item => item.id_producto === productId
    );

    if (existingItemIndex > -1) {
      const currentItem = currentState.items[existingItemIndex];

      if (currentItem.cantidad > 1) {
        const newItems = [...currentState.items];
        newItems[existingItemIndex] = {
          ...currentItem,
          cantidad: currentItem.cantidad - 1,
          subtotal: (currentItem.cantidad - 1) * currentItem.precio
        };
        this.updateState(newItems);
      } else {
        this.deleteItem(productId);
      }
    }
  }

  deleteItem(productId: number): void {
    console.log('🗑️ Eliminando producto:', productId);
    const currentState = this.orderState.value;
    const newItems = currentState.items.filter(item => item.id_producto !== productId);
    this.updateState(newItems);
  }

  clearOrder(): void {
    console.log('🧹 Limpiando todo el carrito');
    this.updateState([]);
  }

  private updateState(items: CartItem[]): void {
    const subtotal = this.calculateSubtotal(items);
    const tax = this.calculateTax(subtotal);
    const total = this.calculateTotal(subtotal, tax);

    const newState: OrderState = {
      items,
      subtotal,
      tax,
      total
    };

    this.orderState.next(newState);
    console.log('🛒 Estado actualizado:', {
      items: items.length,
      subtotal,
      tax,
      total
    });
  }

  private calculateSubtotal(items: CartItem[]): number {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    return parseFloat(subtotal.toFixed(2));
  }

  private calculateTax(subtotal: number): number {
    return parseFloat((subtotal * this.TAX_RATE).toFixed(2));
  }

  private calculateTotal(subtotal: number, tax: number): number {
    return parseFloat((subtotal + tax).toFixed(2));
  }

  // NUEVO MÉTODO: Convertir precio de string a número
  private parsePrice(price: any): number {
    if (typeof price === 'number') {
      return price;
    }

    if (typeof price === 'string') {
      // Remover símbolos de moneda y convertir a número
      const cleanedPrice = price.replace('$', '').replace(',', '').trim();
      const parsed = parseFloat(cleanedPrice);
      return isNaN(parsed) ? 0 : parsed;
    }

    return 0;
  }

  getCurrentState(): OrderState {
    return this.orderState.value;
  }
}
