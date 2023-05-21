import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from 'src/app/customers/test/models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnChanges{
  @Input() categoryNameInput: string = "";
  @Input() productIdInput: number = 0;
  product: Product = new Product();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
      this.productsService.getProduct(this.categoryNameInput, String(this.productIdInput)).subscribe((response: Product) => {
        this.product = response;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryNameInput'] || changes['productIdInput']) {
      this.productsService.getProduct(this.categoryNameInput, String(this.productIdInput)).subscribe((response: Product) => {
        this.product = response;
      });
    }
  }
}
