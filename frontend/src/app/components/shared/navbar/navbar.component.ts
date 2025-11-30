import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <i class="fas fa-utensils me-2"></i>
        RESTAURANTE POS
      </div>
      <div class="nav-links">
        <a routerLink="/" class="nav-link">
          <i class="fas fa-home me-1"></i>MENÚ
        </a>
        <a routerLink="/cocina" class="nav-link">
          <i class="fas fa-utensils me-1"></i>Cocina
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: var(--primary);
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .nav-brand {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: background 0.3s ease;
    }
    .nav-link:hover {
      background: rgba(255,255,255,0.1);
    }
    .nav-link.router-link-active {
      background: var(--accent);
    }
  `]
})
export class NavbarComponent {}
