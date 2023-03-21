console.log('About to start a server');

const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log('url:', req.path);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
