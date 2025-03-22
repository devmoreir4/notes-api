require("express-async-errors");

const dotenv = require("dotenv");
const { swaggerUi, specs } = require("./swagger");
const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the documentation at http://localhost:${PORT}/api-docs`);
});
