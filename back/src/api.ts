import express from 'express';
import { Article } from './interfaces/article';

const articles: Article[] = [
  { id: 'a1', name: 'Tournevis-back', price: 3.99, qty: 12 },
  { id: 'a2', name: 'Marteau-back', price: 9.99, qty: 15 },
  { id: 'a3', name: 'Pelle-back', price: 19.99, qty: 2 },
];

const app = express.Router();

app.get('/date', (req, res) => {
  res.json({
    date: new Date(),
  });
});

app.get('/articles', (req, res) => {
  res.json(articles);
});

export default app;
