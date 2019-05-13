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

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
    this.interactionService.movieSource$.subscribe(
      movie => {
        this.addToCart(movie);
      }
    )
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
  }

}
