const { Router } = require('express');

const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();

function myMiddleware(request, response, next) {
    console.log('Middleware executado');
    next();
}

const usersController = new UsersController();

usersRoutes.post('/', myMiddleware, usersController.create);

module.exports = usersRoutes;