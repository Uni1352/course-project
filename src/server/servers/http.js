const express = require('express')
const cors = require('cors');
const routes = require('../routes/router');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', routes);


module.exports = app;