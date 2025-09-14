const {defineConfig} = require("drizzle-kit");
const dotenv = require("dotenv");
const config = defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./drizzle/schema.js",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

module.exports = config;

// drizzle-orm is used to get you send and recieve the record from and to db
// drizzle-kit is used to send migrations to the db
