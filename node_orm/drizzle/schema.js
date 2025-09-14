const {pgTable, integer, varchar} = require("drizzle-orm/pg-core");

const usersTable = pgTable("users", {
  id: integer().primaryKey(),
  name: varchar("name", {length: 255}).notNull(),
  email: varchar("email", {length: 255}).notNull().unique(),
});

module.exports = {usersTable};


// drizzle-orm is used to make the schema
// drizzle kit will be used to visualize and send the schema or migrations to the db