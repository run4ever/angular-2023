import api from './api';
import express, { NextFunction, Request, Response } from 'express';
import serveIndex from 'serve-index';
const app = express();
const port = 3000;

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('url:', req.path);
  next();
};

app.use(logger);

app.use('/api', api);

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
