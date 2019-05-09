import { Component, OnInit } from '@angular/core';
import { ICartProduct } from '../interfaces/ICartProduct';

@Component({
  selector: 'app-add-products-to-cart',
  templateUrl: './add-products-to-cart.component.html',
  styleUrls: ['./add-products-to-cart.component.css']
})
export class AddProductsToCartComponent implements OnInit {

  cart: ICartProduct[] = []

  constructor() { }

  ngOnInit() {
  }

}
