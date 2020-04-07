const express = require('express');
const routes = require('./router');

const app = express();

// Servidor vai aceitar requisições via JSON
app.use(express.json());

app.use(routes);

app.listen(3333);
