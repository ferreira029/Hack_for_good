const express = require('express');
const globo =  require('./functions/g1.js');

const router = express();

router.get('/', globo.g1);

// Tornar a variável visivel em outros arquivos
module.exports = router;