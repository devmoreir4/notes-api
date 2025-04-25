const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  },
};
