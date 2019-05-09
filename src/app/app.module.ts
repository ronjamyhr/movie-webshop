import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductpresentationComponent } from './productpresentation/productpresentation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { AddProductsToCartComponent } from './add-products-to-cart/add-products-to-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowproductsComponent,
    ProductpresentationComponent,
    HeaderComponent,
    FooterComponent,
    // AddProductsToCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
