import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { StockComponent } from './stock/stock.component';
import { RessourcesComponent } from './ressources/ressources.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: 'accueil', component: AccueilComponent},
    {path: 'stock', component: StockComponent},
    {path: 'ressources', component: RessourcesComponent},
    { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Redirection par défaut vers l'accueil
  { path: '**', redirectTo: '/accueil', pathMatch: 'full' } // Redirection pour les routes inconnues vers l'accueil
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }