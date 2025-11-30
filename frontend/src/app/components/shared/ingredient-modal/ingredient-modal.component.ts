import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
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
  isClosing: boolean = false;

  constructor(
    private apiService: ApiService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('🎯 Modal inicializado con producto:', this.product);
    if (this.product) {
      this.isVisible = true;
      this.cdr.detectChanges();
      this.loadIngredients();
    }
  }

  @HostListener('click', ['$event'])
  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  loadIngredients() {
    if (!this.product) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.apiService.getProductIngredients(this.product.id).subscribe({
      next: (ingredientes) => {
        console.log('🧩 Ingredientes recibidos:', ingredientes);

        // RESTAURAR: Todos los ingredientes en una sola lista, marcando los default como seleccionados
        this.ingredientes = ingredientes.map(ing => ({
          ...ing,
          seleccionado: ing.es_default // Los default inician seleccionados
        }));

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error cargando ingredientes:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleIngredient(ingrediente: IngredienteProducto) {
    if (!ingrediente.es_modificable) return;
    ingrediente.seleccionado = !ingrediente.seleccionado;
    this.cdr.detectChanges();
  }

  generateEspecificaciones(): string {
    const modificaciones: string[] = [];

    this.ingredientes.forEach(ing => {
      if (ing.es_modificable) {
        if (ing.es_default && !ing.seleccionado) {
          // Estaba marcado por defecto y lo quitaron → "Sin [ingrediente]"
          modificaciones.push(`Sin ${ing.nombre}`);
        } else if (!ing.es_default && ing.seleccionado) {
          // No estaba marcado y lo agregaron → "Con [ingrediente]"
          modificaciones.push(`Con ${ing.nombre}`);
        }
      }
    });

    return modificaciones.join(', ');
  }

  calculateTotalPrice(): number {
    if (!this.product) return 0;

    const basePrice = this.parsePrice(this.product.precio);
    let extras = 0;

    // Solo cobrar por ingredientes EXTRAS que se hayan AGREGADO
    this.ingredientes.forEach(ing => {
      if (ing.es_modificable && !ing.es_default && ing.seleccionado) {
        extras += ing.precio_extra;
      }
    });

    return basePrice + extras;
  }

  confirmSelection() {
    if (!this.product) return;

    const especificaciones = this.generateEspecificaciones();
    const precioFinal = this.calculateTotalPrice();

    console.log('✅ Especificaciones generadas:', especificaciones);
    console.log('💰 Precio final:', precioFinal);

    const productoConPrecio: Producto = {
      ...this.product,
      precio: precioFinal
    };

    this.orderService.addItemWithCustomization(productoConPrecio, especificaciones);
    this.confirmed.emit({
      product: productoConPrecio,
      especificaciones: especificaciones
    });

    this.closeModal();
  }

  addWithoutCustomization() {
    if (!this.product) return;

    console.log('✅ Agregando producto sin personalización:', this.product.nombre);
    this.orderService.addItemWithCustomization(this.product, '');
    this.closeModal();
  }

  closeModal() {
    this.isClosing = true;
    setTimeout(() => {
      this.isVisible = false;
      this.close.emit();
    }, 300);
  }

  preventClose(event: Event) {
    event.stopPropagation();
  }

  parsePrice(price: any): number {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const cleanedPrice = price.replace('$', '').replace(',', '').trim();
      const parsed = parseFloat(cleanedPrice);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  // Método para separar ingredientes default de extras (para el template)
  getIngredientesDefault(): IngredienteProducto[] {
    return this.ingredientes.filter(ing => ing.es_default);
  }

  getIngredientesExtras(): IngredienteProducto[] {
    return this.ingredientes.filter(ing => !ing.es_default && ing.es_modificable);
  }
}
