import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Article } from '../models/Article';
import { MiseAJourStock } from '../models/MiseAJourStock';


@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private http:HttpClient) {}


  public getStocks(){
    return this.http.get<Article[]>(`${environment.api}/stock`,{});
  }

  public addStock(entree:MiseAJourStock){
    return this.http.post<MiseAJourStock>(`${environment.api}/stock/entree`,entree);
  }

  public removeStock(entree:MiseAJourStock){
    return this.http.post<MiseAJourStock>(`${environment.api}/stock/sortie`,entree);
  }
}
