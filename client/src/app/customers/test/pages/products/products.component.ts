import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Product from 'src/app/customers/test/models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  @Output() goToProduct = new EventEmitter<void>();
  @Output() specifyProductId = new EventEmitter<number>();
  @Output() addToVisitedProducts = new EventEmitter<string>();
  @Input() categoryInput: string = "";
  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllFromCategory(this.categoryInput).subscribe((response: Product[]) => {
      this.products = response;
    });
  }

  onClickGoToProduct(){
    this.goToProduct.emit();
  }
  onClickSpecifyProductId(id: number){
    this.specifyProductId.emit(id);
  }
  onClickAddToVisitedProductsList(name: string){
    this.addToVisitedProducts.emit(name);
  }
}