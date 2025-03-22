const dotenv = require("dotenv");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gerenciamento de Notas",
      version: "1.0.0",
      description: "API para gerenciamento de usuários, notas e tags",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
