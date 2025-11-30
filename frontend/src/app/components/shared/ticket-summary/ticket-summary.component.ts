import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ticket-container">
      <div class="ticket-header">
        <h3 class="ticket-title">ORDEN #001</h3>
        <div class="ticket-date">{{ getFormattedDate() }}</div>
      </div>

      <div class="ticket-items">
        <div class="ticket-item" *ngFor="let item of sampleItems">
          <span class="item-quantity">{{ item.quantity }}x</span>
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">\${{ item.price }}</span>
        </div>
      </div>

      <div class="ticket-divider"></div>

      <div class="ticket-totals">
        <div class="total-line">
          <span>Subtotal:</span>
          <span>\${{ calculateSubtotal() }}</span>
        </div>
        <div class="total-line">
          <span>IVA (16%):</span>
          <span>\${{ calculateIVA() }}</span>
        </div>
        <div class="total-line grand-total">
          <span>TOTAL:</span>
          <span class="text-gradient">\${{ calculateTotal() }}</span>
        </div>
      </div>

      <button class="btn-pay btn-premium w-100 mt-3">
        <i class="fas fa-credit-card me-2"></i>Pagar Ahora
      </button>
    </div>
  `,
  styles: [`
    .ticket-container {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      font-family: 'Courier Prime', monospace;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      position: relative;
      max-width: 320px;
      margin: 0 auto;
    }

    .ticket-container::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 10px;
      right: 10px;
      height: 20px;
      background:
        radial-gradient(circle at 10px 0, transparent 10px, white 11px) 0 0 / 20px 100%,
        radial-gradient(circle at 10px 0, transparent 10px, white 11px) 10px 0 / 20px 100%;
      background-repeat: repeat-x;
    }

    .ticket-header {
      text-align: center;
      border-bottom: 2px dashed #e0e0e0;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }

    .ticket-title {
      font-weight: 700;
      color: var(--secondary);
      margin-bottom: 0.25rem;
    }

    .ticket-date {
      font-size: 0.8rem;
      color: var(--text-light);
    }

    .ticket-items {
      margin-bottom: 1rem;
    }

    .ticket-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px dotted #e0e0e0;
    }

    .item-quantity {
      font-weight: 700;
      color: var(--primary);
    }

    .item-name {
      flex: 1;
      margin: 0 0.5rem;
    }

    .item-price {
      font-weight: 700;
    }

    .ticket-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e0e0e0, transparent);
      margin: 1rem 0;
    }

    .total-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .grand-total {
      font-size: 1.2rem;
      font-weight: 700;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 2px solid var(--accent);
    }

    .btn-pay {
      font-family: 'Poppins', sans-serif;
      font-size: 1.1rem;
      padding: 12px;
    }
  `]
})
export class TicketSummaryComponent {
  currentDate = new Date();

  sampleItems = [
    { quantity: 1, name: 'Hamburguesa Clásica', price: 120 },
    { quantity: 1, name: 'Coca-Cola', price: 35 },
    { quantity: 2, name: 'Papas Fritas', price: 45 }
  ];

  getFormattedDate(): string {
    return this.currentDate.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  calculateSubtotal(): number {
    return this.sampleItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }

  calculateIVA(): number {
    return this.calculateSubtotal() * 0.16;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateIVA();
  }
}
