import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';
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
    return of(undefined).pipe(
      tap(() => {
        this.errorMsg = '';
        this.isLoading = true;
      }),
      delay(2000), // pour permettre de visualiser le loader, sinon trop rapide (faire un hard refresh dans le nav)
      switchMap(() => this.http.get<Article[]>(url)),
      map((articles) => {
        this.articles$.next(articles);
      }),
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Erreur Technique';
        return of(undefined);
      })
    );
  }

  override add(newArticle: NewArticle): Observable<void> {
    return this.http.post<void>(url, newArticle);
  }

  override refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.get<Article[]>(url)),
      map((articles) => {
        this.articles$.next(articles);
      })
    );
  }

  override remove(ids: string[]): Observable<void> {
    return this.http.delete<void>(url, {
      body: ids,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
