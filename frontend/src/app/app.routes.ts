import { Routes } from '@angular/router';
import { MenuSelectionComponent } from './components/pages/menu-selection/menu-selection.component';

export const routes: Routes = [
  { path: '', component: MenuSelectionComponent }, // Página de inicio
  { path: '**', redirectTo: '' } // Redirección para rutas no encontradas
];
