const { hash, compare } = require('bcryptjs');
const sqliteConnection = require('../database/sqlite');
const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection();

        const userAlreadyExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (userAlreadyExists) {
            throw new AppError('User already exists.', 400);
        }

        const hashedPassword = await hash(password, 8);

        await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();

        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if (!user) {
            throw new AppError('User not found.', 404);
        }

        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError('Email already in use.', 400);
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if (password && !old_password) {
            throw new AppError('Old password is required.', 400);
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError('Old password does not match.', 400);
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
        );

        return response.status(200).json();
    }

    async show(request, response) {
        const { id } = request.params;
        const database = await sqliteConnection();

        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if (!user) {
            throw new AppError('User not found.', 404);
        }

        response.json({name: user.name, email: user.email});
    }

    async delete(request, response) {
        const { id } = request.params;
        const database = await sqliteConnection();
        
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);
        
        if (!user) {
            throw new AppError('User not found.', 404);
        }

        const checkUserNote = await knex("notes").where({ user_id:id });

        if(checkUserNote){
           await knex("notes").where({ user_id:id }).delete();
        }

        await database.run('DELETE FROM users WHERE id = (?)', [id]);
       
        response.json({ message:"User deleted successfully!" });
    }
}

module.exports = UsersController;