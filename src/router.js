const express = require('express');
const generalFunction =  require('./functions/generalFunction');

const router = express();

router.get('/', generalFunction.index);

// Tornar a variável visivel em outros arquivos
module.exports = router;