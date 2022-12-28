import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../model/product-model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct: ProductModel = {
    title: '',
    price: 0,
    description: '',
    category: '',
    id: ''
  };

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.currentProduct.id = this.route.snapshot.params['id'];
    this.getProduct(this.currentProduct.id)
  }

  getProduct(id: string): void {
    this.productService.getById(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
