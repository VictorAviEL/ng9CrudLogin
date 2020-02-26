import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  readProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/api/products`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.PHP_API_SERVER}/api/products`, product);
  }

  updateProduct(product: Product) {
    return this.httpClient.put<Product>(`${this.PHP_API_SERVER}/api/products/${product.product_id}`, product);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete<Product>(`${this.PHP_API_SERVER}/api/products/${id}`);
  }
}
