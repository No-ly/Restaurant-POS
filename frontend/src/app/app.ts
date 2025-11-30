import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GlassCardComponent } from './components/shared/glass-card/glass-card.component';
import { TicketSummaryComponent } from './components/shared/ticket-summary/ticket-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    GlassCardComponent,
    TicketSummaryComponent
  ],
  template: `
    <div class="container my-4">
      <app-glass-card [padding]="'2rem'" [customClass]="'mb-4'">
        <h1 class="text-gradient text-center">🍽️ Restaurant POS</h1>
        <p class="text-center text-muted">Sistema de Punto de Venta</p>
      </app-glass-card>

      <app-ticket-summary></app-ticket-summary>
    </div>
  `,
  styleUrls: ['./app.css']  // Cambié a app.css que sí existe
})
export class AppComponent {
  title = 'restaurant-pos';
}
