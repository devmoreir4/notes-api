const express = require('express');
const app = express();

// route params
app.get('/message/:user/:id', (request, response) => {
    const { user, id } = request.params;

    return response.send(`User: ${user}, ID: ${id}`);
});

// query params
// http://localhost:3333/users?page=2&limit=10
app.get('/users', (request, response) => {
    const { page, limit } = request.query;

    return response.send(`Page: ${page}, Limit: ${limit}`);
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});