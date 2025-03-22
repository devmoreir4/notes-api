const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userAlreadyExists = await knex("users").where({ email }).first();

    if (userAlreadyExists) {
      throw new AppError("User already exists.", 400);
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const userWithUpdatedEmail = await knex("users").where({ email }).first();

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Email already in use.", 400);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Old password is required.", 400);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match.", 400);
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where({ id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    });

    return response.status(200).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await knex("users")
      .where({ id })
      .select("name", "email")
      .first();

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    await knex("notes").where({ user_id: id }).delete();

    await knex("users").where({ id }).delete();

    response.json({ message: "User deleted successfully!" });
  }
}

module.exports = UsersController;
