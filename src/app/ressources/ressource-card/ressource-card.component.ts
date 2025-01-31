import { Component, Input } from '@angular/core';
import { Ressource } from '../../models/Ressource';

@Component({
  selector: 'app-ressource-card',
  standalone: true,
  imports: [],
  templateUrl: './ressource-card.component.html',
  styleUrl: './ressource-card.component.css'
})
export class RessourceCardComponent {
    @Input() ressource!: Ressource;
  
    constructor() {}

    mapRessourceType(type: "human" | "machine"): string {
      switch (type) {
        case "human":
          return "Humaine";
        case "machine":
          return "Equipement";
        default:
          return "Inconnu";
      }
    }
}
