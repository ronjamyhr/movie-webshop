import { Injectable } from "@angular/core";
import { IMovie } from "../interfaces/IMovie";
import { IDataService } from "../interfaces/IDataService";
import { Observable, of } from "rxjs";
import { IOrder, IOrderRow } from '../interfaces/IOrder';


@Injectable({
  providedIn: "root"
})
export class MockDataService implements IDataService {

  movies: IMovie[] = [
    {
      id: 76,
      name: "The Dark Knight",
      "description": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice",
      price: 199,
      imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
      year: 2008,
      added: "2016-01-05T00:00:00",
      productCategory: []
    },

    {
      id: 77,
      name: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      price: 129,
      imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SY1000_CR0,0,640,1000_AL_.jpg",
      year: 2014,
      added: "2017-07-16T00:00:00",
      productCategory: []
    },

    {
      id: 78,
      name: "Le fabuleux destin d'Amélie Poulain",
      description: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
      price: 100,
      imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
      year: 2001,
      added: "2017-07-10T00:00:00",
      productCategory: []
    }
  ]

  orderRowsContent: IOrderRow[] = [
    {
      productId: 76,
      amount: 1
    }
  ]

  order: IOrder[] = [
    {
      id: 0,
      companyId: 22,
      created: "June 3, 2019 3:24 PM",
      createdBy: "en@mail.se",
      paymentMethod: "card",
      totalPrice: 199,
      status: 1,
      orderRows: this.orderRowsContent
    }
  ]

  orders: IOrder[] = [
    {
      id: 0,
      companyId: 22,
      created: "June 3, 2019 3:24 PM",
      createdBy: "en@mail.se",
      paymentMethod: "card",
      totalPrice: 199,
      status: 1,
      orderRows: this.orderRowsContent
    },
    {
      id: 0,
      companyId: 22,
      created: "June 5, 2019 3:24 PM",
      createdBy: "annan@mail.se",
      paymentMethod: "paypal",
      totalPrice: 199,
      status: 1,
      orderRows: this.orderRowsContent
    }
  ]

  constructor() { }

  fetchMovies(): Observable<IMovie[]> {
    return of(this.movies);
  }

  fetchSingleMovie(id): Observable<IMovie> {
    return of(this.movies[0]);
  }

  postOrder(order): Observable<IOrder> {
    return of(this.order[0]);
  }

  fetchOrder(): Observable<IOrder[]> {
    return of(this.orders);
  }

}
