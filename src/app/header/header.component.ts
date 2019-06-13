import { Component, OnInit, HostListener } from '@angular/core';
import { InteractionService } from '../services/interaction.service';
import { ICartProduct } from '../interfaces/ICartProduct';
import { IMovie } from '../interfaces/IMovie';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: ICartProduct[] = [];
  // showCart = false;
  totalSum: number;
  totalAmount: number;
  navClassName: string = 'transparentNav';


  constructor(private interactionService: InteractionService, private router: Router) { }

  ngOnInit() {


    this.interactionService.getCartFromLocalStorage();
    this.cart = this.interactionService.getCart();
    this.countTotalAmount();
    this.countTotalPrice();

    this.interactionService.movieSource$.subscribe(
      cart => {
        this.print(cart);

      }
    );

    $(document).on('click', function (e) {
      if ($(e.target).closest(".cartContainer").length === 0) {
        $(".cartDropdown").removeClass("showCart");
        $(".cartDropdown").addClass("hideCart");
      }
    });

  }

  toggleDropdownCart() {

    // this.showCart = !this.showCart;

      console.log('cartToggle');

      if($(".cartDropdown").hasClass('hideCart')) {
        $(".cartDropdown").removeClass("hideCart");
        $(".cartDropdown").addClass("showCart");
      } else {
        $(".cartDropdown").addClass("hideCart");
        $(".cartDropdown").removeClass("showCart");
      }
    

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

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {

    if ($event.path[1].scrollY >= 10) {

      this.navClassName = 'darkNav';

    } else if ($event.path[1].scrollY <= 10) {

      this.navClassName = 'transparentNav';
    }
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);

    // this.showCart = false;
    $(".cartDropdown").addClass("hideCart");
  }
}



