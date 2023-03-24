import express from 'express';
import { Article, NewArticle } from './interfaces/article';

const generateId = () => {
  return Date.now() + '_' + Math.round(Math.random() * 1e12);
};

const articles: Article[] = [
  { id: 'a1', name: 'Tournevis-back', price: 3.99, qty: 12 },
  { id: 'a2', name: 'Marteau-back', price: 9.99, qty: 15 },
  { id: 'a3', name: 'Pelle-back', price: 19.99, qty: 2 },
];

const app = express.Router();

//pour générer une attente et rassurer l'utilisateur
app.use((req, res, next) => {
  setTimeout(next, 500);
});

app.get('/date', (req, res) => {
  res.json({
    date: new Date(),
  });
});

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.use(express.json());

//il faudrait vérifier le contenu de body mais ceci n'est pas un cours sur le back
app.post('/articles', (req, res) => {
  const newArticle: NewArticle = req.body;
  const article = { ...newArticle, id: generateId() };
  articles.push(article);
  res.status(201).end();
});

export default app;
