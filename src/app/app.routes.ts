import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { StockComponent } from './stock/stock.component';
import { RessourcesComponent } from './ressources/ressources.component';

export const routes: Routes = [
    {path: 'accueil', component: AccueilComponent},
    {path: 'stock', component: StockComponent},
    {path: 'ressources', component: RessourcesComponent},
];
