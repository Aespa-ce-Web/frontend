import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ressource } from '../../models/Ressource';
import { environment } from '../../../environments/environment';
import { Reservation } from '../../models/Reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {

  constructor(private http:HttpClient) {}
  
  
    public getRessources(){
      return this.http.get<Ressource[]>(`${environment.api}/ressources`,{});
    }

    public getReservationsParRessourceId(ressourceId: number) : Observable<Reservation[]> {
      return this.http.get<Reservation[]>(`${environment.api}/ressources/reservations`,{
        params: {
          ressource_id: ressourceId.toString(),
        }
      });
    }

    public demanderAbsence(reservation: any) {
      return this.http.post(`${environment.api}/ressources/reserver`, reservation);
    }

}
