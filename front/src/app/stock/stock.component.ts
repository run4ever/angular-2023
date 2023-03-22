import { Component, OnDestroy } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  articles: Article[] = [
    { id: 'a1', name: 'Tournevis', price: 3.99, qty: 12 },
    { id: 'a2', name: 'Marteau', price: 9.99, qty: 15 },
    { id: 'a3', name: 'Pelle', price: 19.99, qty: 2 },
  ];

  ngOnDestroy(): void {
    console.log('bye bybe');
  }
}
