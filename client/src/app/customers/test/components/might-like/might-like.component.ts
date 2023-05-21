import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import Product from '../../models/product';
import { MightLikeService } from '../../services/might-like.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-might-like',
  templateUrl: './might-like.component.html',
  styleUrls: ['./might-like.component.css']
})
export class MightLikeComponent implements OnChanges {
  @Output() goToProduct = new EventEmitter<string>();
  @Input() categoryNameInput: string = "";
  @Input() productIdInput: number = 0;
  productName: string = "";
  prompt: string[] = [];
  productsList: Product[] = [];

  constructor(private MLService: MightLikeService, private productsService: ProductsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryNameInput'] || changes['productIdInput']) {
      this.productsList = [];
      this.fetchProducts();
    }
  }
  
  async fetchProducts(): Promise<void> {
    this.productsService.getProduct(this.categoryNameInput, String(this.productIdInput)).subscribe(async (response: Product) => {
      this.productName = response.name;
      try {
        const response = await (await this.MLService.get(this.productName)).toPromise();
        const jsonStr = JSON.stringify(response);
        const jsonObj = JSON.parse(jsonStr);
        const promptItems = jsonObj.message.split(',');
        this.prompt = promptItems.map((item: string) => item.trim().split('.')[0]);
        console.log(this.prompt);
      } catch (error) {
        console.log(error);
      }

      this.prompt.forEach((currentValue, index) => {
        this.productsService.getProductSpecific(currentValue).subscribe((response: Product) => {
          this.productsList.push(response);
          console.log(this.productsList[index])
        });
      });
    });
  }

  navigateToProduct(productName: string){
    this.goToProduct.emit(productName);
  }
}
