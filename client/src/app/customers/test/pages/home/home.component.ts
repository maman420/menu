import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories$ = this.categoryService.getAll();

  visitedProducts: string[] = [];

  goingBack: boolean = false;

  chosenCategory: string = "";
  productId: number = 0;
  currentView = 'home';

  constructor(private categoryService: CategoriesService, private http: HttpClient, private productService: ProductsService) { }

  setCurrentView(x: string) {
    this.currentView = x;
    if (this.goingBack)
      this.goingBack = false;
  }
  setCategory(category: string) {
    this.chosenCategory = category;
  }
  setProductId(id: number) {
    this.productId = id;
  }
  goBack() {
    this.goingBack = true;
  }

  addVisitedProduct(productName: string) {
    this.visitedProducts.push(productName);
  }

  navigateToProduct(productName: string) {
    this.productService.getProductSpecific(productName).subscribe((data) => {
      this.productId = data.id;
      this.chosenCategory = data.category;
      console.log(data.id, data.category);
      this.addVisitedProduct(data.name)
    })
  }

  // Send the list of visited products to the API when the user leaves the page
  @HostListener('window:beforeunload')
  sendVisitedProducts() {
    // Send a POST request to your API to store the visited products
    this.http.post('http://localhost:8080/test/api/visited-products', { products: this.visitedProducts }).subscribe(
      () => {
        // API call successful, do nothing
      },
      (error) => {
        console.error('Error saving visited products:', error);
      }
    );
  }
}
