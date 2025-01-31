import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { StockComponent } from './stock/stock.component';

export const routes: Routes = [
    {path: 'accueil', component: AccueilComponent},
    {path: 'stock', component: StockComponent},
];
