import { Component, OnInit, HostListener } from '@angular/core';
import { IOrder, IOrderRow, IExtendedOrder } from '../interfaces/IOrder';
import { DataServiceService } from '../services/data-service.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { IMovie } from '../interfaces/IMovie';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orders: IOrder[];
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

    this.dataService.fetchOrder().subscribe((orderData) => {
      
      this.orders = orderData;

      for (let i = 0; i < this.orders.length; i++) {
        this.extendedOrders.push({ order: this.orders[i], movieNames: []});

        let orderRows = this.orders[i].orderRows;

        for (let j = 0; j < orderRows.length; j++) {
          let productId = orderRows[j].productId;

          //console.log('product id from orderrows: ' + productId);

          this.dataService.fetchSingleMovie(productId).subscribe((data) => {
      
            //console.log(data);
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
      behavior: "smooth"
    });
  }

}
