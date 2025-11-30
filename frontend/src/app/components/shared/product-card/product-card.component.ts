import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../interfaces/api.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card glass-panel card-hover-effect" (click)="selectProduct()">
      <div class="product-image">
        <img
          [src]="getProductImage()"
          [alt]="product.nombre"
          class="img-fluid"
          (error)="onImageError($event)"
        >
      </div>
      <div class="product-info p-3">
        <h5 class="product-name fw-bold mb-2">{{ product.nombre }}</h5>
        <p class="product-price mb-0" style="color: var(--accent);">
          {{ '$' + product.precio }}
        </p>
        <small class="text-muted">{{ product.categoria_nombre }}</small>
      </div>
    </div>
  `,
  // En product-card.component.ts - actualiza los estilos:
styles: [`
  .product-card {
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .product-image {
    height: 180px; /* Altura fija para consistencia */
    overflow: hidden;
    background: linear-gradient(135deg, var(--bg-light) 0%, #E8E2D6 100%);
    flex-shrink: 0;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Esto mantiene las proporciones */
    transition: transform 0.3s ease;
  }

  .product-card:hover .product-image img {
    transform: scale(1.05);
  }

  .product-info {
    padding: 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .product-name {
    color: var(--secondary);
    font-size: 1.1rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
    min-height: 2.8rem;
  }

  .product-price {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.25rem;
  }

  .product-category {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-top: auto;
  }
`]
})
export class ProductCardComponent {
  @Input() product!: Producto;

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
    // Evento para seleccionar producto (se implementará después)
    console.log('Producto seleccionado:', this.product);
  }
}
