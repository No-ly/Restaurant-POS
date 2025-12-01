import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ReporteDiario } from '../../../interfaces/api.interface';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  reporte: ReporteDiario = {
    totalVentas: 0,
    cantidadPedidos: 0,
    ticketPromedio: 0,
    ultimasVentas: []
  };

  // Valores animados para el counter
  animatedTotalVentas: number = 0;
  animatedCantidadPedidos: number = 0;
  animatedTicketPromedio: number = 0;

  loading: boolean = true;
  error: string = '';
  currentDate: string = '';
  animacionCompletada: boolean = false; // ← NUEVA VARIABLE

  private refreshSubscription!: Subscription;
  private animationFrameId!: number;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.actualizarFecha();
    this.cargarReporte();
    this.iniciarAutoRefresh();
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  cargarReporte() {
    this.loading = true;
    this.error = '';
    this.animacionCompletada = false; // ← RESETEAR ANIMACIÓN

    console.log('📊 Cargando reporte del día...');

    this.apiService.getReporteDiario().subscribe({
      next: (reporte) => {
        console.log('✅ Reporte recibido:', reporte);
        this.reporte = reporte;
        this.iniciarAnimacionContadores();
        // NO poner loading = false aquí, lo hará la animación
      },
      error: (error) => {
        console.error('❌ Error cargando reporte:', error);
        this.error = 'Error cargando reporte del día';
        this.loading = false;
        this.animacionCompletada = true;
      }
    });
  }

  // ANIMACIÓN DE CONTADORES - Efecto ReactBits
  private iniciarAnimacionContadores() {
    const duracion = 1500; // Reducido a 1.5 segundos
    const frameRate = 60;
    const totalFrames = (duracion / 1000) * frameRate;
    let currentFrame = 0;

    const valoresFinales = {
      totalVentas: this.reporte.totalVentas,
      cantidadPedidos: this.reporte.cantidadPedidos,
      ticketPromedio: this.reporte.ticketPromedio
    };

    // Resetear valores animados
    this.animatedTotalVentas = 0;
    this.animatedCantidadPedidos = 0;
    this.animatedTicketPromedio = 0;

    const animar = () => {
      currentFrame++;

      // Función de easing para efecto suave
      const progreso = this.easeOutQuart(currentFrame / totalFrames);

      this.animatedTotalVentas = this.calcularValorAnimado(0, valoresFinales.totalVentas, progreso);
      this.animatedCantidadPedidos = this.calcularValorAnimado(0, valoresFinales.cantidadPedidos, progreso);
      this.animatedTicketPromedio = this.calcularValorAnimado(0, valoresFinales.ticketPromedio, progreso);

      if (currentFrame < totalFrames) {
        this.animationFrameId = requestAnimationFrame(animar);
      } else {
        // Asegurar valores finales exactos
        this.animatedTotalVentas = valoresFinales.totalVentas;
        this.animatedCantidadPedidos = valoresFinales.cantidadPedidos;
        this.animatedTicketPromedio = valoresFinales.ticketPromedio;

        // MARCAR COMO COMPLETADO
        this.loading = false;
        this.animacionCompletada = true;
        console.log('🎯 Animación completada, loading desactivado');
      }
    };

    this.animationFrameId = requestAnimationFrame(animar);
  }

  private calcularValorAnimado(inicio: number, fin: number, progreso: number): number {
    const valor = inicio + (fin - inicio) * progreso;

    // Formatear según el tipo de dato
    if (fin === Math.round(fin)) {
      return Math.round(valor); // Para números enteros (cantidad de pedidos)
    } else {
      return parseFloat(valor.toFixed(2)); // Para decimales (dinero)
    }
  }

  // Función de easing para efecto suave
  private easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }

  iniciarAutoRefresh() {
    // Actualizar cada 30 segundos (más espaciado para reportes)
    this.refreshSubscription = interval(30000).subscribe({
      next: () => {
        if (!this.loading) { // Solo actualizar si no está cargando
          console.log('🔄 Actualizando reporte automáticamente...');
          this.cargarReporte();
        }
      },
      error: (error) => {
        console.error('❌ Error en auto-refresh:', error);
      }
    });
  }

  actualizarFecha() {
    this.currentDate = new Date().toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(valor);
  }

  formatearNumero(valor: number): string {
    return valor.toLocaleString('es-MX');
  }

  // Método para forzar la finalización (debug)
  forzarFinalizacion() {
    this.loading = false;
    this.animacionCompletada = true;
    console.log('🚨 Loading forzado a false');
  }
}
