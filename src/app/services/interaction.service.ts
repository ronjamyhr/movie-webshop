import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { ICartProduct } from '../interfaces/ICartProduct';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private movieSource = new Subject<ICartProduct[]>();

  cart: ICartProduct[] = [];

  movieSource$ = this.movieSource.asObservable();

  constructor() { }

  //skickar med hela min cart
  sendCart(movie: IMovie) {

    let addedMovie = false;

    // movieToAdd.id = id på klickade film
    //this.cart[i].movie.id = id på den som finns i cart
    for (let i = 0; i < this.cart.length; i++) {
      if (movie.id === this.cart[i].movie.id) {
        this.cart[i].amount++;
        addedMovie = true;
        this.cart[i].totalPrice += this.cart[i].movie.price;
      }
    }

    if (addedMovie === false) {
      this.cart.push({ movie: movie, amount: 1, totalPrice: movie.price });
    }

    this.movieSource.next(this.cart);

    this.saveCartToLocalStorage();
  }


  delete(id: number) {
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
    this.movieSource.next(this.cart);

    this.saveCartToLocalStorage();
  }


  saveCartToLocalStorage() {

    localStorage.setItem('myCartLocalStorage', JSON.stringify(this.cart));

  }


  getCartFromLocalStorage() {

    let fetchLocalStorageCart = localStorage.getItem('myCartLocalStorage');

    if (localStorage.getItem('myCartLocalStorage') == null || localStorage.getItem('myCartLocalStorage') == '[]') {
      this.cart = [];
    } else {
      this.cart = JSON.parse(fetchLocalStorageCart);
    }

    this.getCart();
  }


  getCart() {

    return this.cart;

  }




}
