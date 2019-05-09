import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../services/interaction.service';
import { ICartProduct } from '../interfaces/ICartProduct';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: ICartProduct[] = [];

  // får jag tillgång till allt som finns i InteractionService-klassen genom att skriva så här nedan? Förutom private?
  constructor(private interactionService: InteractionService) { }

  
  ngOnInit() {
    this.interactionService.tM$.subscribe(
      poop => {
        this.cart.push({movie: poop, amount: 1});
        console.log(poop.id);
        alert(poop.name);
        console.log(this.cart);
      }
    )
  }

}
