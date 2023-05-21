import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { SocialMediaComponent } from '../components/social-media/social-media.component';
import { BannerComponent } from '../components/banner/banner.component';
import { MembersComponent } from './members/members.component';
import { MightLikeComponent } from '../components/might-like/might-like.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    FooterComponent,
    HeaderComponent,
    SocialMediaComponent, 
    BannerComponent, 
    MembersComponent,
    MightLikeComponent
  ],
  imports: [CommonModule],
})
export class TestModule {}
