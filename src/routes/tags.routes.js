const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const tagsController = new TagsController();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Operações relacionadas às tags
 */

/**
 * @swagger
 * /tags/{user_id}:
 *   get:
 *     summary: Lista as tags de um usuário
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de tags retornada com sucesso
 *       404:
 *         description: Tags não encontradas
 */
tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;
