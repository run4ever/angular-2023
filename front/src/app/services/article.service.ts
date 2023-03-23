import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  //on definit l'observable (syntaxe $)
  articles$ = new BehaviorSubject<Article[]>([
    { id: 'a1', name: 'Tournevis', price: 3.99, qty: 12 },
    { id: 'a2', name: 'Marteau', price: 9.99, qty: 15 },
    { id: 'a3', name: 'Pelle', price: 19.99, qty: 2 },
  ]);

  constructor() {
    //on ajoute un element au bout de 2 secondes
    setTimeout(() => {
      this.articles$.value.push({
        id: 'a4',
        name: 'Truc',
        price: 0.99,
        qty: 22,
      });
      this.articles$.next(this.articles$.value); //repulication des données pour tous ceux qui ecoutent
    }, 2000);
  }
}
