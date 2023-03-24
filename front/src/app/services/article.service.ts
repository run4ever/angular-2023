import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  Observable,
  of,
  tap,
} from 'rxjs';
import { generateId } from 'src/misc';
import { Article, NewArticle } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  clear() {
    throw new Error('Method not implemented.');
  }
  //on definit l'observable (syntaxe $)
  protected articles$ = new BehaviorSubject<Article[]>([
    { id: 'a1', name: 'Tournevis', price: 3.99, qty: 12 },
    { id: 'a2', name: 'Marteau', price: 9.99, qty: 15 },
    { id: 'a3', name: 'Pelle', price: 19.99, qty: 2 },
  ]);

  add(newArticle: NewArticle): Observable<void> {
    //of : publie un truc vide puis se ferme
    //tap : dès que tu recois un truc, execute la fonction suivante
    return of(undefined).pipe(
      delay(2000),
      tap(() => {
        if (newArticle.name === 'Truc') {
          throw new Error('Forbidden value');
        }
        this.articles$.value.push({
          id: generateId(),
          ...newArticle,
        });
        this.articles$.next(this.articles$.value);
      })
    );
  }

  getArticles(): Observable<Article[]> {
    return this.articles$.pipe(distinctUntilChanged());
  }

  remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      tap(() => {
        if (ids.length > 1) {
          throw new Error('interdit de supprimer plusieurs aticles');
        }
        this.articles$.next(
          this.articles$.value.filter((a) => !ids.includes(a.id))
        );
      })
    );
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(delay(2000));
  }
}
