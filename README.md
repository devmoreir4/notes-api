<h1 align="center" style="font-weight: bold;">Notes Management System</h1>

<p align="justify">
  This project is a backend API built with Node.js and Express, using the SQLite database to store information. 
  Interaction with the database is handled through Knex.js, which facilitates the execution of SQL queries. 
  The API allows users to create, organize and manage notes by associating them with tags and links. 
  Additionally, it offers advanced search functionality by keywords in the title or by tags, and 
  includes operations for creating, updating, listing and deleting users.
</p>

<h2 id="started">Getting started</h2>

```bash
# Clone the repository
git clone https://github.com/devmoreir4/notes-api.git

# Navigate to the project directory
cd notes-api

# Install dependencies
npm install

# Run database migrations
npm run migrate

# Start the application
npm start
``````

<h2 id="routes">API Endpoints</h2>

These are the main API routes.
​
| route                         | description                                          
|-------------------------------|-----------------------------------------------------
| <kbd>POST /users</kbd>        | creates a new user.
| <kbd>PUT /users/:id</kbd>     | updates an existing user.
| <kbd>GET /users/:id</kbd>     | retrieves a user's details.
| <kbd>DELETE /users/:id</kbd>  | deletes a user.
| <kbd>GET /tags/:user_id</kbd> | retrieves all tags for a user.
| <kbd>POST /notes/:user_id</kbd>| creates a new note for a user.
| <kbd>GET /notes/:id</kbd>     | retrieves a note by its ID.
| <kbd>DELETE /notes/:id</kbd>  | deletes a note by its ID.
| <kbd>GET /notes</kbd>         | retrieves notes based on query parameters.

