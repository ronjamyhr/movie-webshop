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

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
    this.interactionService.movieSource$.subscribe(
      movie => {
        this.addToCart(movie);
      }
      )
      
      this.printCart();
  }

  addToCart(movieToAdd: IMovie) {

    let addedMovie = false;

    // movieToAdd.id = id på klickade film 
    // this.cart[i].movie.id = id på den som finns i cart 

    for (let i = 0; i < this.cart.length; i++) {
      if (movieToAdd.id === this.cart[i].movie.id) {
        this.cart[i].amount++;
        addedMovie = true;
        // console.log(movieToAdd.id);
        // console.log(movieToAdd.name);
        console.log(this.cart);
      }
    }

    if (addedMovie === false) {
      this.cart.push({ movie: movieToAdd, amount: 1 });
      // console.log(movieToAdd.id);
      // console.log(movieToAdd.name);
      console.log(this.cart);
    }

    this.saveCartToLocalStorage();

  }

  saveCartToLocalStorage(){
    localStorage.setItem('myCartLocalStorage', JSON.stringify(this.cart));

    this.printCart();
  }
 
  printCart(){

    if(localStorage.getItem('myCartLocalStorage') == null || localStorage.getItem('myCartLocalStorage') == "[]" ){
      
      this.cart = [];

    }else{

      let fetchLocalStorageCart = localStorage.getItem('myCartLocalStorage');
      this.cart = JSON.parse(fetchLocalStorageCart);

    }

  }

  toggleDropdownCart(){

    this.showCart = !this.showCart;

  }



}
