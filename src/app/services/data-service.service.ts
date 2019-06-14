import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { IOrder } from '../interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  fetchMovies(): Observable<IMovie[]> {

    return this.http.get<IMovie[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products');
  }

  fetchSingleMovie(id): Observable<IMovie> {

    return this.http.get<IMovie>('https://medieinstitutet-wie-products.azurewebsites.net/api/products/' + id);
  }

  postOrder(order): Observable<IOrder> {

    return this.http.post<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', order);
  }

  fetchOrder(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=22');
  }

}
