import { Component, OnDestroy } from '@angular/core';
import {
  faRotate,
  faPlus,
  faTrashAlt,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
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
  faCircleNotch = faCircleNotch;
  //articleService: ArticleService; plus besoin qd on ajoute le protected (accessible depuis classes et descendants)
  selectedArticles = new Set<Article>();
  isRemoving = false;
  isRefreshing = false;
  errorMsg = '';

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

  refresh() {
    console.log('refresh');
    of(undefined)
      .pipe(
        tap(() => {
          this.errorMsg = '';
          this.isRefreshing = true;
        }),
        switchMap(() => {
          return this.myArticleService.refresh();
        }),
        finalize(() => {
          this.isRefreshing = false;
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = err.message;
          return of(undefined);
        })
      )
      .subscribe();
  }

  remove() {
    console.log('remove');
    const ids = [...this.selectedArticles].map((a) => a.id); //transforme un ensemble en tableau et on ne prend que l'id

    of(undefined)
      .pipe(
        tap(() => {
          this.errorMsg = '';
          this.isRemoving = true;
        }),
        switchMap(() => {
          return this.myArticleService.remove(ids);
        }),
        switchMap(() => {
          return this.myArticleService.refresh();
        }),
        tap(() => {
          this.selectedArticles.clear();
        }),
        finalize(() => {
          this.isRemoving = false;
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = 'Erreur technique';
          return of(undefined);
        })
      )
      .subscribe();
  }

  getErrorMsg(): string {
    if (this.errorMsg !== '') {
      return this.errorMsg;
    }
    return this.myArticleService.errorMsg;
  }

  ngOnDestroy(): void {
    console.log('bye bye');
  }
}
