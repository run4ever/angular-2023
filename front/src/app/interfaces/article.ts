export interface Article {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export type NewArticle = Omit<Article, 'id'>; //Omit : objet Article sans l'id. Type : interface que l'on modifie
