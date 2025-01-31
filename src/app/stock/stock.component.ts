import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { StockServiceService } from '../services/stock-service.service';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
  articles: Article[] = [];

  constructor(private stockService: StockServiceService) {}

  ngOnInit(): void {
    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du stock :', error);
      }
    });
  }
}
