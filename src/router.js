const express = require('express');
<<<<<<< HEAD
const globo =  require('./functions/g1.js');
=======
const generalFunction =  require('./functions/generalFunction');
>>>>>>> e9dd52b7c220b70ee5ee3d278fdaee4521256895

const router = express();

router.get('/', generalFunction.index);

// Tornar a variável visivel em outros arquivos
module.exports = router;