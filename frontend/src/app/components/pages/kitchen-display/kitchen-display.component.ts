import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { PedidoCocina, ItemCocina } from '../../../interfaces/api.interface';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-kitchen-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitchen-display.component.html',
  styleUrls: ['./kitchen-display.component.css']
})
export class KitchenDisplayComponent implements OnInit, OnDestroy {
  pedidos: PedidoCocina[] = [];
  loading: boolean = true;
  error: string = '';
  currentTime: string = '';

  private refreshSubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef // ← AGREGAR ESTO
  ) {}

  ngOnInit() {
    this.cargarPedidos();
    this.iniciarAutoRefresh();
    this.actualizarHora();
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  cargarPedidos() {
    this.loading = true;
    this.error = '';

    console.log('🔍 Solicitando pedidos pendientes...');

    this.apiService.getPedidosPendientes().subscribe({
      next: (pedidos) => {
        console.log('✅ Pedidos recibidos (crudos):', pedidos);

        // TRANSFORMAR LOS DATOS
        this.pedidos = this.transformarPedidos(pedidos);

        console.log('🔄 Pedidos transformados:', this.pedidos);
        console.log('📊 Total de pedidos:', this.pedidos.length);

        this.loading = false;
        this.actualizarHora();

        // FORZAR DETECCIÓN DE CAMBIOS - ESTO ARREGLA EL ERROR
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error cargando pedidos:', error);
        this.error = 'Error cargando pedidos: ' + error.message;
        this.loading = false;
        this.cdr.detectChanges(); // ← También aquí
      }
    });
  }

  // FUNCIÓN SIMPLIFICADA - El backend ya formatea los datos
  private transformarPedidos(pedidos: any[]): PedidoCocina[] {
    if (!pedidos || !Array.isArray(pedidos)) {
      console.warn('⚠️ No hay pedidos o no es un array');
      return [];
    }

    return pedidos.map((pedido, index) => {
      console.log(`🔍 Procesando pedido ${index + 1}:`, pedido);

      // 1. Asegurar que items sea un array
      let items: ItemCocina[] = [];

      if (Array.isArray(pedido.items)) {
        items = pedido.items;
      } else {
        console.warn('⚠️ Items no es array:', typeof pedido.items);
        items = [];
      }

      // 2. Usar los datos ya formateados del backend
      const pedidoTransformado: PedidoCocina = {
        id: pedido.id || index + 1,
        mesa: pedido.mesa || `Mesa ${index + 1}`,
        fecha: pedido.fecha || new Date().toISOString(),
        fecha_formateada: pedido.fecha_formateada || '--:--',
        total: this.parsearTotal(pedido.total),
        estado: pedido.estado || 'Pendiente',
        items: items.map((item: any, itemIndex: number) => ({
          id_producto: item.id_producto || itemIndex + 1,
          nombre_producto: item.nombre_producto || `Producto ${itemIndex + 1}`,
          cantidad: item.cantidad || 1,
          especificaciones: item.especificaciones || '',
          estado_preparacion: item.estado_preparacion || 'Pendiente'
        }))
      };

      console.log(`🎯 Pedido ${index + 1} transformado:`, pedidoTransformado);
      return pedidoTransformado;
    });
  }

  private parsearTotal(total: any): number {
    if (typeof total === 'number') return total;
    if (typeof total === 'string') {
      const parsed = parseFloat(total);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  iniciarAutoRefresh() {
    this.refreshSubscription = interval(10000)
      .pipe(switchMap(() => this.apiService.getPedidosPendientes()))
      .subscribe({
        next: (pedidos) => {
          console.log('🔄 Auto-refresh - Pedidos recibidos:', pedidos);
          this.pedidos = this.transformarPedidos(pedidos);
          this.actualizarHora();
          this.cdr.detectChanges(); // ← También aquí
        },
        error: (error) => {
          console.error('❌ Error en auto-refresh:', error);
        }
      });
  }

  actualizarHora() {
    this.currentTime = new Date().toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  completarPedido(id: number) {
    if (!confirm('¿Marcar esta orden como COMPLETADA?')) {
      return;
    }

    this.apiService.completarPedido(id).subscribe({
      next: (response) => {
        console.log('✅ Pedido completado:', response);
        this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
        this.actualizarHora();
        this.cdr.detectChanges(); // ← Y aquí
        alert(`🎉 Orden #${id} marcada como COMPLETADA`);
      },
      error: (error) => {
        console.error('❌ Error completando pedido:', error);
        alert('Error al completar el pedido');
      }
    });
  }

  esParaLlevar(mesa: string): boolean {
    return mesa.toLowerCase().includes('llevar');
  }

  tieneEspecificaciones(especificaciones: string): boolean {
    return !!especificaciones && especificaciones.trim() !== '';
  }
}
