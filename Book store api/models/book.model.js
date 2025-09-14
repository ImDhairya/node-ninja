const {pgTable, uuid, text, index, varchar} = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model.js");
const {sql} = require("drizzle-orm");

const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 100}).notNull(),
    description: text(),
    authorId: uuid()
      .references(() => authorsTable.id)
      .notNull(),
  },
  (table) => ({
    searchIndexOnTitle: index("books_title_search_idx").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`
    ),
  })
);

module.exports = booksTable;
