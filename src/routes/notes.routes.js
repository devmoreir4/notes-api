const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

const notesController = new NotesController();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Operações relacionadas às notas
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Lista as notas com filtros opcionais
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: title
 *         description: Título para filtrar as notas
 *         schema:
 *           type: string
 *       - in: query
 *         name: user_id
 *         description: ID do usuário dono das notas
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: tags
 *         description: Tags separadas por vírgula para filtrar as notas
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de notas retornada com sucesso
 */
notesRoutes.get("/", notesController.index);

/**
 * @swagger
 * /notes/{user_id}:
 *   post:
 *     summary: Cria uma nova nota para um usuário
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID do usuário que criará a nota
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados da nota a ser criada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tags
 *               - links
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Nota criada com sucesso
 */
notesRoutes.post("/:user_id", notesController.create);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Exibe os detalhes de uma nota
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da nota
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da nota retornados com sucesso
 *       404:
 *         description: Nota não encontrada
 */
notesRoutes.get("/:id", notesController.show);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Exclui uma nota
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da nota a ser excluída
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nota excluída com sucesso
 *       404:
 *         description: Nota não encontrada
 */
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
