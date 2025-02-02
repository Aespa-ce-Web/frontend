import { Component, Input } from '@angular/core';
import { Ressource } from '../../models/Ressource';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ressource-card',
  standalone: true,
  imports: [RouterLink],
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
