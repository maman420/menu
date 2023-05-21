import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private elementRef: ElementRef) {}

  scrollToElement(elementId: string): void {
    const yOffset = -50; // adjust this value as needed
    const element = this.elementRef.nativeElement.querySelector('#' + elementId);
    if (element) {
      const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
    }
  }
}
