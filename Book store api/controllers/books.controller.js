const db = require("../db/index");
const {booksTable} = require("../models/index");
const {authorTable} = require("../models/index");
const {eq, ilike, sql} = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  const data = await db.select().from(booksTable);

  res.json({message: "All the books are here.", data});
};

exports.getBooksById = async function (req, res) {
  const id = req.params.id;

  const [book] = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, id))
    .leftJoin(authorTable, eq(booksTable.authorId, authorTable.id))
    .limit(1);

  if (!book) {
    return res.status(404).json({error: "Book not found"});
  }

  res.json(book);
};

exports.searchBook = async function (req, res) {
  const {search} = req.query;

  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ plainto_tsquery('english', ${search})`
      );

    return res.json({books});
  }

  return res.json({message: "The search not found"});
};

exports.createBooks = async function (req, res) {
  const {title, description, authorId} = req.body;
  if (!title) {
    return res.status(400).json({
      error: "title is required",
    });
  }

  if (!description) {
    return res.status(400).json({
      error: "description is required.",
    });
  }
  const [createBookData] = await db
    .insert(booksTable)
    .values({
      title,
      authorId,
      description,
    })
    .returning({
      id: booksTable.id,
    });

  return res
    .status(201)
    .json({message: "Book created successfully.", createBookData});
};

exports.deleteBookById = async function (req, res) {
  const bookId = req.params.id;

  if (!bookId) {
    return res
      .status(400)
      .json({error: "The book id is required to delete a book."});
  }
  const deleted = await db
    .delete(booksTable)
    .where(eq(booksTable.id, bookId))
    .returning({id: booksTable.id});

  if (deleted.length === 0) {
    return res.status(404).json({error: "Book not found."});
  }
  return res.status(200).json({
    message: "The book is deleted.",
    bookId,
  });
};
