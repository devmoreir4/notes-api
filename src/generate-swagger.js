const fs = require("fs");
const path = require("path");
const { specs } = require("./swagger");

const outputPath = path.resolve(__dirname, "../docs/swagger.json");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));

console.log("Swagger JSON gerado com sucesso em:", outputPath);
