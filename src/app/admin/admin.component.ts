import { Component, OnInit, HostListener } from '@angular/core';
import { IExtendedOrder } from '../interfaces/IOrder';
import { DataServiceService } from '../services/data-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  extendedOrders: IExtendedOrder[] = [];
  backToTop = false;

  constructor(private dataService: DataServiceService, private router: Router) { }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    // Prenumerera på ordern och filmnamnet som ligger i databasen och pushar in i egenskapen extendedOrders 
    this.dataService.fetchOrder().subscribe((orderData) => {

      for (let i = 0; i < orderData.length; i++) {
        this.extendedOrders.push({ order: orderData[i], movieNames: [] });

        let orderRows = orderData[i].orderRows;

        for (let j = 0; j < orderRows.length; j++) {
          let productId = orderRows[j].productId;

          this.dataService.fetchSingleMovie(productId).subscribe((data) => {

            this.extendedOrders[i].movieNames.push(data.name);

          });
        }
      }
    });
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {

    if ($event.path[1].scrollY >= 100) {

      this.backToTop = true;


    } else if ($event.path[1].scrollY <= 100) {

      this.backToTop = false;
    }
  }

  scrollToTop() {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
