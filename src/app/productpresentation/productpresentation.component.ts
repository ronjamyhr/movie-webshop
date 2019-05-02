import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

@Component({
  selector: 'app-productpresentation',
  templateUrl: './productpresentation.component.html',
  styleUrls: ['./productpresentation.component.css']
})
export class ProductpresentationComponent implements OnInit {

  @Input() movie: IMovie;
  @Output() remove = new EventEmitter <number>();

  constructor() { }

  ngOnInit() {
  }

  addMovieToCart(){
    // this.remove.emit(this.movie.id);
    // Här ska vi lägga till i kundkorgen 
  }

}
