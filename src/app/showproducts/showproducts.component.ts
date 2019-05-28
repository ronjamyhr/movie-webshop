import { Component, OnInit } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  productsArray: IMovie[];

  constructor(private dataService: DataServiceService) {
  }

  ngOnInit() {
     // Här prenumererar vi på data som vi får från fetchMovies, all data vi får sparas i variabeln movieApi.
     this.dataService.fetchMovies().subscribe(movieApi => this.productsArray = movieApi);
  }


}
