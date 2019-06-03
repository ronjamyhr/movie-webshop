import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../services/interaction.service';
import { ICartProduct } from '../interfaces/ICartProduct';
import { IMovie } from '../interfaces/IMovie';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IOrder } from '../interfaces/IOrder';
import { DataServiceService } from '../services/data-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  timeNow = moment().format('lll');
  cart: ICartProduct[] = [];
  showCart = false;
  totalSum: number;
  totalAmount: number;
  orderForm = this.fb.group({ 

    emailAdress: ['', [Validators.required, Validators.email]],  
    paymentMethod: ['', Validators.required]

  });

  constructor(private interactionService: InteractionService, private router: Router, private fb: FormBuilder, private dataService: DataServiceService) { }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.interactionService.getCartFromLocalStorage();
    this.cart = this.interactionService.getCart();
    this.countTotalAmount();
    this.countTotalPrice();


    this.interactionService.movieSource$.subscribe(
      cart => {
        this.print(cart);

      }
    );
  }

  toggleDropdownCart() {

    this.showCart = !this.showCart;

    this.countTotalPrice();
  }

  addSingleMovieToCart(singleMovie: IMovie) {

    this.interactionService.sendCart(singleMovie);

    this.cart = this.interactionService.cart;

    this.countTotalAmount();
    this.countTotalPrice();
  }

  deleteOneMovieFromCart(id) {

    this.interactionService.delete(id);

    this.countTotalAmount();
    this.countTotalPrice();
  }

  print(cart) {

    console.log('movie: ' + cart);

    this.cart = cart;

    this.countTotalAmount();
    this.countTotalPrice();
  }

  countTotalPrice() {

    this.totalSum = 0;

    for (let i = 0; i < this.cart.length; i++) {

      // this.totalSum blir värdet av föregående värde och beräkning på höger sida om likamed tecknet
      this.totalSum += this.cart[i].movie.price * this.cart[i].amount;
    }
  }

  countTotalAmount() {

    this.totalAmount = 0;

    for (let i = 0; i < this.cart.length; i++) {

      // this.totalAmount blir värdet av föregående värde och beräkning på höger sida om likamed tecknet
      this.totalAmount += this.cart[i].amount;
    }
  }

  postOrder() {

    let orderRowsContent = [];

    for (let i = 0; i < this.cart.length; i++) {

      let amount = this.cart[i].amount;
      let id = this.cart[i].movie.id;

      orderRowsContent.push({ productId: id, amount: amount });
    }

    let order: IOrder = {
      id: 0,
      companyId: 22,
      created: this.timeNow,
      createdBy: this.orderForm.get('emailAdress').value,
      paymentMethod: this.orderForm.get('paymentMethod').value,
      totalPrice: this.totalSum,
      status: 0,
      orderRows: orderRowsContent
    }

    this.dataService.postOrder(order).subscribe()
  }
}
