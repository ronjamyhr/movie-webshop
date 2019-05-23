import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { IMovie } from '../interfaces/IMovie';
import { MockDataService } from '../services/mock-data.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  singleMovie: IMovie = {
    id:0,
    description: '',
    name:'',
    price: 0,
    imageUrl: '',
    year: 0,
    added:'',
    productCategory:[] 
  };

  constructor(private route: ActivatedRoute, private dataService: DataServiceService, private interactionService: InteractionService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(myParams => {
      let id = myParams.get('id');
      console.log('Got from service ' + id);
      this.dataService.fetchSingleMovie(id).subscribe((data) => {
        this.singleMovie = data;
      });
      // this.dataService.fetchMovie(id).subscribe((data) => { this.singleMovie = data; });
    });
  }


  addMovieToCart(movie){
    this.interactionService.sendMessage(movie);

    console.log('Klick');
  }

}
