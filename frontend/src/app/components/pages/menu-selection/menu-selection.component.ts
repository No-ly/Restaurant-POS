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
  templateUrl: './menu-selection.component.html',
  styleUrls: ['./menu-selection.component.css']
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
