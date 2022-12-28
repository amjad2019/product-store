import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product-model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products?: ProductModel[];
  currentProduct: ProductModel = {
    title: '',
    price: 0,
    description: '',
    category: '',
    id: ''
  };
  currentIndex = -1;
  title = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(this.products);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {
      title: '',
      price: 0,
      description: '',
      category: '',
      id: ''
    };
    this.currentIndex = -1;
  }

  setActiveProduct(product: ProductModel, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentProduct = {
      title: '',
      price: 0,
      description: '',
      category: '',
      id: ''
    };
    this.currentIndex = -1;

    this.productService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
