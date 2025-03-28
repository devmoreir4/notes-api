const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const insertedNotes = await knex("notes")
      .insert({
        title,
        description,
        user_id,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning("id");

    const note_id =
      typeof insertedNotes[0] === "object"
        ? insertedNotes[0].id
        : insertedNotes[0];

    if (links && links.length > 0) {
      const linksInsert = links.map((link) => ({
        note_id,
        url: link,
      }));

      await knex("links").insert(linksInsert);
    }

    if (tags && tags.length > 0) {
      const tagsInsert = tags.map((name) => ({
        note_id,
        name,
        user_id,
      }));

      await knex("tags").insert(tagsInsert);
    }

    return response.json({ message: "Note created successfully!" });
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();

    if (!note) {
      return response.status(404).json({ error: "Note not found." });
    }

    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("updated_at");

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();

    if (!note) {
      return response.status(404).json({ error: "Note not found." });
    }

    await knex("notes").where({ id }).delete();

    return response.json({ message: "Note deleted successfully!" });
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;
    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .innerJoin("notes", "notes.id", "tags.note_id")
        .where("notes.user_id", user_id)
        .where("notes.title", "ilike", `%${title}%`) // ilike = case-insensitive
        .whereIn("name", filterTags)
        .orderBy("notes.title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .where("title", "ilike", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });

    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);
      return { ...note, tags: noteTags };
    });

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;
