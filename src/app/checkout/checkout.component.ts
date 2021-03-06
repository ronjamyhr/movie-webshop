import { Component, OnInit, HostListener } from '@angular/core';
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

  backToTop = false;
  timeNow = moment().format('lll');
  cart: ICartProduct[] = [];
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

    this.cart = cart;
    this.countTotalAmount();
    this.countTotalPrice();
  }

  countTotalPrice() {

    this.totalSum = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.totalSum += this.cart[i].movie.price * this.cart[i].amount;
    }
  }

  countTotalAmount() {

    this.totalAmount = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.totalAmount += this.cart[i].amount;
    }
  }

  //Lägger in order i databasen, hämtar från formulär och egenskaper, prenumererar på postOrder från interaction service.
  postOrder() {

    if (this.orderForm.valid) {

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

      this.dataService.postOrder(order).subscribe();
      this.clearCart();
      this.router.navigate(['/finish']);

    }
  }

  clearCart() {
    this.interactionService.clearCartLocalstorage();
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {

    if ($event.path[1].scrollY >= 100) {
      this.backToTop = true;
    } else if ($event.path[1].scrollY <= 100) {
      this.backToTop = false;
    }
  }

  scrollToTop() {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
