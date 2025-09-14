const {eq, sql} = require("drizzle-orm");
const db = require("../db/index");

const authorTable = require("../models/author.model");

exports.getAllAuthors = async function (req, res) {
  const data = await db.select().from(authorTable);
  console.log(data, "FEFEFE");
  res.json({message: "All authors information.", data});
};

exports.getAuthorById = async function (req, res) {
  const {id} = req.params;

  const [author] = await db
    .select()
    .from(authorTable)
    .where(eq(authorTable.id, id))
    .limit(1);

  if (!author) {
    return res.status(404).json({
      error: "The author id not found",
    });
  }

  return res.status(202).json({
    message: "Author data.",
    author,
  });
};

exports.searchAuthor = async function (req, res) {
  const {search} = req.query;
  console.log(search, "FFF");
  if (search) {
    const authors = await db
      .select()
      .from(authorTable)
      .where(
        sql`to_tsvector('english', ${authorTable.email}) @@plainto_tsquery('english', ${search})`
      );

    return res.json({authors});
  }

  const data = await db.select().from(authorTable);

  return res.json({message: "All authors information", data});
};

exports.addAuthorData = async function (req, res) {
  const {firstname, lastname, email} = req.body;

  if (!firstname || !lastname || !email) {
    return res.status(402).json({
      message: "firstname, lastname, email is required ",
    });
  }

  const [createAuthor] = await db
    .insert(authorTable)
    .values({
      firstname,
      lastname,
      email,
    })
    .returning({
      id: authorTable.id,
    });

  return res.status(201).json({
    message: "Author created successfully.",
    createAuthor,
  });
};

exports.removeAutor = async function (req, res) {
  const {id} = req.params;
  const deletedAuthor = await db
    .delete(authorTable)
    .where(eq(authorTable.id, id))
    .returning({email: authorTable.email});

  if (deletedAuthor.length == 0) {
    return res.status(404).json({
      error: "Author not found.",
    });
  }

  return res.status(200).json({
    message: "The author is delete.",
    id,
  });
};
