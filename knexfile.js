const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT || "pg",
    connection: {
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      password: process.env.DB_PASSWORD || "123",
      database: process.env.DB_NAME || "notes_db",
      port: process.env.DB_PORT || 5432,
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
