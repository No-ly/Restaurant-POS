import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { OrderService } from '../../../services/order.service';
import { Producto, IngredienteProducto } from '../../../interfaces/api.interface';

@Component({
  selector: 'app-ingredient-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredient-modal.component.html',
  styleUrls: ['./ingredient-modal.component.css']
})
export class IngredientModalComponent implements OnInit {
  @Input() product: Producto | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<{product: Producto, especificaciones: string}>();

  ingredientes: IngredienteProducto[] = [];
  loading: boolean = false;
  isVisible: boolean = false;

  constructor(
    private apiService: ApiService,
    private orderService: OrderService
  ) {}


  ngOnInit() {
    console.log('🎯 Modal inicializado con producto:', this.product);
    if (this.product) {
      this.loadIngredients();
      this.isVisible = true;
      console.log('👁️ Modal visible establecido a:', this.isVisible);
    }
  }

  loadIngredients() {
    if (!this.product) return;

    this.loading = true;
    console.log('🔄 Cargando ingredientes para producto:', this.product.id);

    this.apiService.getProductIngredients(this.product.id).subscribe({
      next: (ingredientes) => {
        console.log('🧩 Ingredientes recibidos:', ingredientes);
        console.log('📊 Cantidad de ingredientes:', ingredientes.length);

        this.ingredientes = ingredientes.map(ing => ({
          ...ing,
          seleccionado: ing.es_default
        }));
        this.loading = false;
        console.log('✅ Loading completado, ingredientes asignados');
      },
      error: (error) => {
        console.error('❌ Error cargando ingredientes:', error);
        this.loading = false;
        console.log('❌ Loading completado con error');
      }
    });
  }


  toggleIngredient(ingrediente: IngredienteProducto) {
    if (!ingrediente.es_modificable) return;
    ingrediente.seleccionado = !ingrediente.seleccionado;
  }

  generateEspecificaciones(): string {
    const modificaciones: string[] = [];

    this.ingredientes.forEach(ing => {
      if (ing.es_modificable) {
        if (ing.es_default && !ing.seleccionado) {
          // Estaba marcado por defecto y lo quitaron
          modificaciones.push(`Sin ${ing.nombre}`);
        } else if (!ing.es_default && ing.seleccionado) {
          // No estaba marcado y lo agregaron
          modificaciones.push(`Con ${ing.nombre}`);
        }
      }
    });

    return modificaciones.join(', ');
  }

  confirmSelection() {
    if (!this.product) return;

    const especificaciones = this.generateEspecificaciones();
    console.log('✅ Especificaciones generadas:', especificaciones);

    // Agregar al carrito
    this.orderService.addItemWithCustomization(this.product, especificaciones);

    // Emitir evento de confirmación
    this.confirmed.emit({
      product: this.product,
      especificaciones: especificaciones
    });

    this.closeModal();
  }

  closeModal() {
    this.isVisible = false;
    setTimeout(() => {
      this.close.emit();
    }, 300);
  }

  // Prevenir que el modal se cierre al hacer clic en el contenido
  preventClose(event: Event) {
    event.stopPropagation();
  }

  addWithoutCustomization() {
  if (!this.product) return;

  console.log('✅ Agregando producto sin personalización:', this.product.nombre);
  this.orderService.addItemWithCustomization(this.product, '');
  this.closeModal();

  // Opcional: mostrar feedback
  alert(`✅ ${this.product.nombre} agregado al pedido`);
}
}
