const db = require("./db/index.js");
require("dotenv/config");

const {usersTable} = require("./drizzle/schema.js");

async function getAllUsers() {
  const users = await db.select().from(usersTable);
  console.log("Users in db:", users);
  return users;
}

getAllUsers();

async function createUser({id, name, email}) {
  const newUser = await db.insert(usersTable).values({
    id,
    name,
    email,
  });

  console.log("The new user is created", newUser);

  return newUser;
}

// createUser({id: 1, name: "Dhairya pandya", email: "abc@yopmail.com"});

// createUser({id: 2, name: "abhishek pandya", email: "abhishekl@yopmail.com"});
