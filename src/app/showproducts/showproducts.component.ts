import { Component, OnInit, HostListener } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  productsArray: IMovie[];
  backToTop = false;


  constructor(private dataService: DataServiceService) {
  }

  ngOnInit() {
     // Här prenumererar vi på data som vi får från fetchMovies, all data vi får sparas i variabeln movieApi.
     this.dataService.fetchMovies().subscribe(movieApi => this.productsArray = movieApi);
  }


  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {

    if ($event.path[1].scrollY >= 100) {

      this.backToTop = true;


    } else if ($event.path[1].scrollY <= 100) {

      this.backToTop = false;
    }
  }

  scrollToTop(){

    // window.scrollTo(0, 0);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


  }



}
