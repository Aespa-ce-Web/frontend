import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { StockServiceService } from '../services/stock-service.service';
import { ArticleCardComponent } from '../stock/article-card/article-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [ArticleCardComponent,FormsModule,CommonModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
  articles: Article[] = [];
  searchTerm: string = '';

  constructor(private stockService: StockServiceService) {}

  ngOnInit(): void {
    this.stockService.getStocks().subscribe({
      next: (data) => {
        console.log('Données reçues :', data); // Vérifie si les articles sont bien récupérés
        this.articles = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du stock :', error);
      }
    });
  }

  get filteredArticles(): Article[] {
    if (!this.searchTerm) {
      return this.articles;
    }
    const term = this.searchTerm.toLowerCase();
    return this.articles.filter(article =>
      article.nom.toLowerCase().includes(term) ||
      article.id
    );
  }
}
