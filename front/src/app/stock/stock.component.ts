import { Component, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  //articleService: ArticleService; plus besoin qd on ajoute le protected (accessible depuis classes et descendants)

  //on ajoute un constructeur dans lequel on injecte le service (readonly equivaut à final en java)
  constructor(protected readonly myArticleService: ArticleService) {
    console.log('articleService : ', myArticleService);
    //this.articleService = myArticleService;  plus besoin qd on ajoute le protected
  }

  ngOnDestroy(): void {
    console.log('bye bye');
  }
}
