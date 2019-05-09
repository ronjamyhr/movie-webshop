import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { ICartProduct } from '../interfaces/ICartProduct';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private tMS = new Subject<IMovie>();

  cart: ICartProduct[] = [];

  tM$ = this.tMS.asObservable();

  constructor() { }

  sendMessage(movie: IMovie){
    this.tMS.next(movie);
    // console.log(this.cart);
  }
}
