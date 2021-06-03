const express = require('express')
const cors = require('cors');
const routes = require('./src/server/routes/router');
const db = require('./src/server/db/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use('/', express.static(`${__dirname}/dist`));

app.listen(8080, () => {
  console.info('[Server] server started!');
  db.startDB();
});

process.on('SIGINT', () => {
  db.closeDB();
  console.info('[Server] server closed!');
  process.exit();
});