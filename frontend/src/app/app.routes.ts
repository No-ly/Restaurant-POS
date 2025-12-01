import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { MenuSelectionComponent } from './components/pages/menu-selection/menu-selection.component';
import { TicketSummaryComponent } from './components/shared/ticket-summary/ticket-summary.component';
import { KitchenDisplayComponent } from './components/pages/kitchen-display/kitchen-display.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // ← NUEVA LANDING PAGE
  { path: 'pos', component: MenuSelectionComponent },
  { path: 'cocina', component: KitchenDisplayComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }
];
