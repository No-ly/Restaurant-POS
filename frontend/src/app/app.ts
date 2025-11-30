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
    <div class="container-fluid">
      <!-- Header -->
      <app-glass-card [padding]="'1.5rem'" [customClass]="'mb-4 rounded-0'">
        <div class="row align-items-center">
          <div class="col">
            <h1 class="text-gradient mb-0">🍽️ Restaurant POS</h1>
          </div>
          <div class="col-auto">
            <app-ticket-summary></app-ticket-summary>
          </div>
        </div>
      </app-glass-card>

      <!-- Contenido Principal -->
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'restaurant-pos';
}
