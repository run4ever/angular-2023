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

//régler le pb du CORS (autoriser le serveur front à appeler le serveur back)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  //res.setHeader('', '');
  //res.setHeader('', '');
  next();
});

app.use('/api', api);

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
