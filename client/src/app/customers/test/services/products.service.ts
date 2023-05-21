import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Product from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllFromCategory(name: string) {
    return this.http.get<Product[]>('https://localhost:3000/test/category/' + name);
  }

  getProduct(categoryName: string, productId: string) {
    return this.http.get<Product>('https://localhost:3000/test/category/' + categoryName + "/" + productId);
  }

  getProductSpecific(productName: string){
    return this.http.get<Product>('https://localhost:3000/test/product/' + productName);
  }
}
