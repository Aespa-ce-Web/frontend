import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ressource } from '../../models/Ressource';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {

  constructor(private http:HttpClient) {}
  
  
    public getStocks(){
      return this.http.get<Ressource[]>(`${environment.api}/ressources`,{});
    }
}
