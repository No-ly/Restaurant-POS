import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { ApiService } from '../../../services/api.service';
import { OrderState, CartItem, Usuario } from '../../../interfaces/api.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.css']
})
export class TicketSummaryComponent implements OnInit, OnDestroy {
  currentDate = new Date();
  orderState: OrderState = {
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0
  };

  usuarios: Usuario[] = [];
  selectedUsuarioId: number = 0;
  mesaNumber: string = '';
  isProcessing: boolean = false;

  private subscription!: Subscription;

  constructor(
    private orderService: OrderService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.subscription = this.orderService.orderState$.subscribe(state => {
      this.orderState = state;
      console.log('🎫 Estado del carrito actualizado:', state);
    });

    this.loadUsuarios();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUsuarios() {
    this.apiService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        console.log('👥 Usuarios cargados:', usuarios);
      },
      error: (error) => {
        console.error('❌ Error cargando usuarios:', error);
        alert('Error al cargar la lista de meseros');
      }
    });
  }

  addQuantity(productId: number) {
    this.orderService.addQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.orderService.removeItem(productId);
  }

  removeItem(productId: number) {
    this.orderService.deleteItem(productId);
  }

  clearOrder() {
    this.orderService.clearOrder();
    this.resetForm();
  }

  isFormValid(): boolean {
    return this.orderState.items.length > 0 &&
           this.selectedUsuarioId > 0 &&
           this.mesaNumber.trim() !== '' &&
           !this.isProcessing;
  }

  resetForm() {
    this.selectedUsuarioId = 0;
    this.mesaNumber = '';
    this.isProcessing = false; // ← Asegurar reset del estado de procesamiento
    console.log('🔄 Formulario reseteado');
  }

  processPayment() {
    if (!this.isFormValid()) {
      alert('❌ Completa todos los campos requeridos');
      return;
    }

    this.isProcessing = true;
    console.log('🔄 Iniciando procesamiento de pago...');
console.log('🔍 DIAGNÓSTICO DE TOTALES:', {
    subtotal: this.orderState.subtotal,
    iva: this.orderState.tax,
    totalEnviado: this.orderState.total,
    calculoManual: this.orderState.subtotal + this.orderState.tax,
    iguales: this.orderState.total === (this.orderState.subtotal + this.orderState.tax)
  });

  const pedidoData = {
    id_usuario: this.selectedUsuarioId,
    mesa: `Mesa ${this.mesaNumber}`,
    total: this.orderState.total,
    items: this.orderState.items.map(item => ({
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      precio_unitario: item.precio,
      especificaciones: item.especificaciones || ''
    }))
  };

    console.log('📤 Enviando pedido al backend:', pedidoData);

    // Llamar al servicio API
    this.apiService.createPedido(pedidoData).subscribe({
      next: (response) => {
        console.log('✅ Pedido guardado exitosamente:', response);

        // Mostrar confirmación
        alert(`🎉 ¡Pedido #${response.id_pedido} procesado exitosamente!\nTotal: $${this.orderState.total.toFixed(2)}`);

        // Limpiar carrito y formulario
        this.orderService.clearOrder();
        this.resetForm(); // ← Esto ahora resetea isProcessing a false

        console.log('✅ Procesamiento completado, estado reseteado');
      },
      error: (error) => {
        console.error('❌ Error al procesar pedido:', error);
        alert(`❌ Error al procesar el pedido: ${error.error?.message || error.message}`);

        // IMPORTANTE: Resetear el estado de procesamiento en caso de error
        this.isProcessing = false;
        console.log('❌ Procesamiento fallido, estado reseteado');
      }
    });
  }

  getSelectedUsuarioName(): string {
    const usuario = this.usuarios.find(u => u.id === this.selectedUsuarioId);
    return usuario ? usuario.nombre : 'Seleccionar mesero';
  }
}
