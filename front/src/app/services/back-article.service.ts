import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = 'http://localhost:3000/api/articles/';

@Injectable({
  providedIn: 'root',
})
//extends ArticleService + providers: [{ provide: ArticleService, useClass: BackArticleService }] de app.module.ts
//dependancy injections : le code croit qu'il va utiliser ArticleService mais en fait il va utiliser BackArticleService
//dans la vraie vie on modifierait directement la classe ArticleService mais là c'est à but pédagogique
export class BackArticleService extends ArticleService {
  constructor(private readonly http: HttpClient) {
    super();
    console.log('instantiate back-end service');
    this.loadArticles().subscribe();
  }

  loadArticles(): Observable<void> {
    return this.http.get<Article[]>(url).pipe(
      map((articles) => {
        this.articles$.next(articles);
        return;
      })
    );
  }
}
