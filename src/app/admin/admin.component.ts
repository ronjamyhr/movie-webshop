import { Component, OnInit } from '@angular/core';
import { IOrder } from '../interfaces/IOrder';
import { DataServiceService } from '../services/data-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orders: IOrder[];

  constructor(dataService: DataServiceService, private router: Router) { 
    dataService.getOrderData().subscribe((orderData) => {this.orders = orderData; });
  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

  }

}
