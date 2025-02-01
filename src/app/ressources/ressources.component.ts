import { Component } from '@angular/core';
import { Ressource } from '../models/Ressource';
import { RessourcesService } from '../services/ressources/ressources.service';
import { RessourceCardComponent } from './ressource-card/ressource-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ressources',
  standalone: true,
  imports: [RessourceCardComponent,FormsModule,CommonModule],
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.css'
})
export class RessourcesComponent {
  ressources: Ressource[] = [];
  searchTerm: string = '';
  
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

      get filteredRessources(): Ressource[] {
        if (!this.searchTerm) {
          return this.ressources;
        }
        const term = this.searchTerm.toLowerCase();
        return this.ressources.filter(ressources =>
          ressources.nom.toLowerCase().includes(term) || ressources.id.toString().includes(term)
        );
      }
}
