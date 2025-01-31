import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../models/Article';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent implements OnInit {
  @Input() article!: Article;

  constructor() {}

  ngOnInit(): void {
    console.log('ArticleCardComponent :', this.article);
  }
}
