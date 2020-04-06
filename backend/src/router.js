const express = require('express');
const generalFunction =  require('./functions/generalFunction');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

const router = express();

router.post('/search', generalFunction.index);

router.post('/users', userController.create);
router.get('/users', userController.index);
router.post('/login', loginController.create);

// Tornar a variável visivel em outros arquivos
module.exports = router;