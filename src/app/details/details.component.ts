import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { IMovie } from '../interfaces/IMovie';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  singleMovie;
  
  constructor(private route: ActivatedRoute, private dataService: DataServiceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(myParams =>{
      let id = myParams.get('id');
      this.dataService.fetchSingleMovie(id).subscribe((data) => { this.singleMovie = data; });
      // this.dataService.fetchMovie(id).subscribe((data) => { this.singleMovie = data; });

      });
    }
}
