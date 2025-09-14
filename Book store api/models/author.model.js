const {sql} = require("drizzle-orm");
const {pgTable, uuid, varchar} = require("drizzle-orm/pg-core");

const authorTable = pgTable(
  "author",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    firstname: varchar("firstname", {length: 55}).notNull(),
    lastname: varchar("lastname", {length: 55}).notNull(),
    email: varchar("email", {length: 255}).notNull(),
  },
  // (table) => ({
  //   searchIndexOnTitle: index("author_title_serach_idx").using(
  //     "gin",
  //     sql`to_tsvector('english', ${table.email})`
  //   ),
  // })
);

module.exports = authorTable;
