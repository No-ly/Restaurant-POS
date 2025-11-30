import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../interfaces/api.interface';
import { OrderService } from '../../../services/order.service';
import { IngredientModalComponent } from '../ingredient-modal/ingredient-modal.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, IngredientModalComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Producto;
  isPressed = false;
  showIngredientModal = false;

  constructor(private orderService: OrderService) {}

  getProductImage(): string {
    if (this.product.imagen_url) {
      return this.product.imagen_url;
    }
    return 'assets/img/burger_placeholder.png';
  }

  onImageError(event: any) {
    event.target.src = 'assets/img/burger_placeholder.png';
  }

  selectProduct() {
    // Por ahora, abrimos el modal de ingredientes en lugar de agregar directamente
    this.showIngredientModal = true;
  }

  onIngredientModalClose() {
    this.showIngredientModal = false;
  }

  onIngredientConfirmed(event: {product: Producto, especificaciones: string}) {
    console.log('✅ Producto personalizado confirmado:', event);
    this.showIngredientModal = false;

    // Feedback visual
    this.isPressed = true;
    setTimeout(() => {
      this.isPressed = false;
    }, 150);
  }

  getItemQuantity(): number {
    const currentState = this.orderService.getCurrentState();
    const item = currentState.items.find(i => i.id_producto === this.product.id);
    return item ? item.cantidad : 0;
  }
}
