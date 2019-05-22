import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../services/interaction.service';
import { ICartProduct } from '../interfaces/ICartProduct';
import { IMovie } from '../interfaces/IMovie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: ICartProduct[] = [];
  showCart = false;
  totalSum: number;

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
    this.interactionService.movieSource$.subscribe(
      movie => {
        this.addToCart(movie);
        this.countTotalPrice();
      }
    );

    this.printCart();
    this.countTotalPrice();
  }

  addToCart(movieToAdd: IMovie) {
    let addedMovie = false;

    // movieToAdd.id = id på klickade film 
    // this.cart[i].movie.id = id på den som finns i cart 
    for (let i = 0; i < this.cart.length; i++) {
      if (movieToAdd.id === this.cart[i].movie.id) {
        this.cart[i].amount++;
        addedMovie = true;
        this.cart[i].totalPrice += this.cart[i].movie.price;
        //console.log(this.cart);
      }
    }

    if (addedMovie === false) {
      this.cart.push({ movie: movieToAdd, amount: 1, totalPrice: movieToAdd.price });
      //console.log(this.cart);
    }
    this.saveCartToLocalStorage();

  }

  saveCartToLocalStorage() {
    localStorage.setItem('myCartLocalStorage', JSON.stringify(this.cart));
    this.printCart();
  }

  printCart() {
    let fetchLocalStorageCart = localStorage.getItem('myCartLocalStorage');

    if (localStorage.getItem('myCartLocalStorage') == null || localStorage.getItem('myCartLocalStorage') == "[]") {
      this.cart = [];
    } else {
      this.cart = JSON.parse(fetchLocalStorageCart);
    }
    this.countTotalPrice();
  }

  toggleDropdownCart() {
    this.showCart = !this.showCart;
    this.countTotalPrice();
  }

  countTotalPrice() {
    this.totalSum = 0;
    //console.log('Count total: ', this.cart);

    for (let i = 0; i < this.cart.length; i++) {
      //console.log('In loop: ', this.cart[i]);

      // this.totalSum blir värdet av föregående värde och beräkning på höger sida om likamed tecknet
      this.totalSum += this.cart[i].movie.price * this.cart[i].amount;

    }
  }

  addOneMoreMovieToCart(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].movie.id === id) {
        this.cart[i].amount++;
        this.cart[i].totalPrice += this.cart[i].movie.price;
      }
    }
    this.saveCartToLocalStorage();
  }

  deleteOneMovieFromCart(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].movie.id === id) {
        if (this.cart[i].amount > 0) {
          this.cart[i].amount--;
          this.cart[i].totalPrice -= this.cart[i].movie.price;
        }

        if (this.cart[i].amount === 0) {
          this.cart.splice(i, 1);
        }
      }
    }
    this.saveCartToLocalStorage();
  }




}



