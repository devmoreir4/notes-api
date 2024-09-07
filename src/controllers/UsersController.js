const AppError = require('../utils/AppError');

class UsersController {
    create(request, response) {
        const { name, email } = request.body;

        if (!name || !email) {
            throw new AppError('Name and email are required', 400);
        }

        response.satus(201).json({ name, email });
    }
}

module.exports = UsersController;