import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Categoria, Producto } from '../../../interfaces/api.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-menu-selection',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="menu-container">

      <!-- Loading State -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2 text-muted">Cargando menú...</p>
      </div>

      <!-- Contenido Principal -->
      <div *ngIf="!loading">

        <!-- Carrusel Circular SIMPLIFICADO -->
        <div class="categories-section mb-5">
          <h4 class="text-center mb-4 text-secondary">Selecciona una Categoría</h4>
          <div class="categories-container">
            <div
              *ngFor="let categoria of categorias"
              class="category-item"
              [class.active]="categoria.id === selectedCategory?.id"
              (click)="selectCategory(categoria)"
            >
              <div class="category-content">
                {{ categoria.nombre }}
              </div>
            </div>
          </div>
        </div>

        <!-- Grid de Productos -->
        <div class="products-grid">
          <app-product-card
            *ngFor="let product of filteredProducts"
            [product]="product"
          ></app-product-card>

          <!-- Mensaje si no hay productos -->
          <div *ngIf="filteredProducts.length === 0" class="no-products-message">
            <i class="fas fa-utensils fa-2x mb-2"></i>
            <p class="mb-0">No hay productos en esta categoría</p>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .menu-container {
      padding: 1rem 0;
      max-width: 1200px;
      margin: 0 auto;
    }

    .categories-section {
      text-align: center;
    }

    .categories-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
    }

    .category-item {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .category-content {
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .category-item.active .category-content {
      background: var(--primary);
      color: white;
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(184, 92, 56, 0.3);
    }

    .category-item:hover .category-content {
      transform: translateY(-2px);
      background: var(--accent);
      color: white;
      box-shadow: 0 6px 20px rgba(217, 163, 73, 0.3);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .no-products-message {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: var(--text-light);
      background: rgba(255, 255, 255, 0.5);
      border-radius: 16px;
      backdrop-filter: blur(10px);
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }

      .categories-container {
        gap: 0.5rem;
      }

      .category-content {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 576px) {
      .products-grid {
        grid-template-columns: 1fr;
      }

      .categories-container {
        justify-content: flex-start;
        overflow-x: auto;
        padding: 1rem 0.5rem;
      }

      .category-item {
        flex-shrink: 0;
      }
    }
  `]
})
export class MenuSelectionComponent implements OnInit {
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  selectedCategory: Categoria | null = null;
  loading = true;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    console.log('🔄 Iniciando carga de datos...');

    forkJoin({
      cats: this.apiService.getCategorias(),
      prods: this.apiService.getProductos()
    }).subscribe({
      next: (result) => {
        console.log('✅ Datos recibidos:', result);

        this.categorias = result.cats;
        if (this.categorias.length > 0) {
          this.selectedCategory = this.categorias[0];
        }

        this.productos = result.prods;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error cargando datos:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredProducts(): Producto[] {
    if (!this.selectedCategory) return this.productos;
    return this.productos.filter(product =>
      product.id_categoria === this.selectedCategory!.id
    );
  }

  selectCategory(categoria: Categoria) {
    this.selectedCategory = categoria;
  }
}
