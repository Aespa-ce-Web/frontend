import { Component } from '@angular/core';
import { Ressource } from '../models/Ressource';
import { RessourcesService } from '../services/ressources/ressources.service';
import { RessourceCardComponent } from './ressource-card/ressource-card.component';

@Component({
  selector: 'app-ressources',
  standalone: true,
  imports: [RessourceCardComponent],
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.css'
})
export class RessourcesComponent {
  ressources: Ressource[] = [];
  
    constructor(private ressourcesService: RessourcesService) {}
  
    ngOnInit(): void {
      this.ressourcesService.getStocks().subscribe({
        next: (data) => {
          this.ressources = data;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du stock :', error);
        }
      });
    }
}
