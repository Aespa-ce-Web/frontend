import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Article } from '../models/Article';


@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private http:HttpClient) {}


  public getStocks(){
    return this.http.get<Article[]>(`${environment.api}/stock`,{});
  }
}
