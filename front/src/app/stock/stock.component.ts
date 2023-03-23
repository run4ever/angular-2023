import { Component, OnDestroy } from '@angular/core';
import {
  faRotate,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  faRotate = faRotate;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  //articleService: ArticleService; plus besoin qd on ajoute le protected (accessible depuis classes et descendants)
  selectedArticles = new Set<Article>();

  //on ajoute un constructeur dans lequel on injecte le service (readonly equivaut à final en java)
  constructor(protected readonly myArticleService: ArticleService) {
    console.log('articleService : ', myArticleService);
    //this.articleService = myArticleService;  plus besoin qd on ajoute le protected
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }

  ngOnDestroy(): void {
    console.log('bye bye');
  }
}
