import { ProductsDisplayComponent } from './components/products-display/products-display.component';
import { BannerComponent } from './components/banner/banner.component';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../../models/product.model';
import { loadProducts } from '../../state/product/product.actions';
import { selectProducts, selectProductsLoading } from '../../state/product/product.selectors';
import { Observable, of } from 'rxjs';
// import { getProductsList } from '../../state-old/products/products.selector';
// import { loadProducts } from '../../state-old/products/products.actions';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsDisplayComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public products: Product[] = [];
  public discountedProducts!: Product[];

  constructor(private store:Store){

  }

  ngOnInit(): void {
    this.LoadInitialProducts();
  }
  
  populateDiscountedProducts(products: Product[]) {
    if (!this.discountedProducts) {
      this.discountedProducts = [];
    }

    if (products) {
      products.forEach(product => {
        if (product.sale != null) {
          this.discountedProducts.push(product);
        }
      });
    }
  }

  LoadInitialProducts(){
    this.store.dispatch(loadProducts());

    this.store.select(selectProducts).subscribe(productsList => {
      this.products = productsList;
      this.populateDiscountedProducts(productsList);
    });
  }
}
