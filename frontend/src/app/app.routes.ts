import { Routes } from '@angular/router';
import { MenuSelectionComponent } from './components/pages/menu-selection/menu-selection.component';
import { TicketSummaryComponent } from './components/shared/ticket-summary/ticket-summary.component';
import { KitchenDisplayComponent } from './components/pages/kitchen-display/kitchen-display.component'; // Nueva importación

export const routes: Routes = [
  { path: '', component: MenuSelectionComponent },
  { path: 'ticket', component: TicketSummaryComponent },
  { path: 'cocina', component: KitchenDisplayComponent }, // Nueva ruta
  { path: '**', redirectTo: '' }
];
