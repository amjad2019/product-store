import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product-model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  product: ProductModel = {
    title: '',
    price: 0,
    description: '',
    category: '',
    id: ''
  };
  submitted = false;

  constructor(private productService: ProductService) { }


  saveProduct(): void {
    const data = {
      title: this.product.title,
      description: this.product.description,
      price: this.product.price,
      image: this.product.image,
      category: this.product.category
    };

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      title: '',
      price: 0,
      description: '',
      category: '',
      id: ''
    };
  }

}
