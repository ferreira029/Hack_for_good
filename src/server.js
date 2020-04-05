const express = require('express');
const routes = require('./router');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Servidor vai aceitar requisições via JSON
app.use(express.json());

app.use(routes);

app.listen(3333);
