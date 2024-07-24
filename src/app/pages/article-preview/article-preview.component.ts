import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../models/article';
import { ArticleServiceService } from '../../services/article-service.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.css'
})
export class ArticlePreviewComponent implements OnInit {
  article: ArticleModel | null = {
    title: '',
    contents: []
  };

  constructor(private acticleService: ArticleServiceService) {}

  ngOnInit(): void {
    if (this.acticleService.getCurrentArticle()) {
      this.article = this.acticleService.getCurrentArticle();
    }
  }

}
