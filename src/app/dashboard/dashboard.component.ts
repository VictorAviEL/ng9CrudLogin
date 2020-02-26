import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '@app/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: Product[];
  selectedProduct: Product = { product_id: null, product_name: null, product_price: null };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.readProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products);
    });
  }

  createOrUpdateProduct(form) {
    if (this.selectedProduct && this.selectedProduct.product_id) {
      // form.value.id = this.selectedProduct.product_id;
      this.apiService.updateProduct(this.selectedProduct).subscribe((product: Product) => {
        console.log('Product updated', this.selectedProduct);
      });
    } else {
      this.selectedProduct.product_price = form.value.amount;
      this.selectedProduct.product_name = form.value.number;
      this.apiService.createProduct(this.selectedProduct).subscribe((product: Product) => {
        console.log('Product created, ', product);
      });

      this.apiService.readProducts().subscribe((products: Product[]) => {
        this.products = products;
        console.log(this.products);
      });
    }
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  deleteProduct(id) {
    this.apiService.deleteProduct(id).subscribe((product: Product) => {
      console.log('Product deleted, ', product);

      this.apiService.readProducts().subscribe((products: Product[]) => {
        this.products = products;
        console.log(this.products);
      });
    });
  }
}
