import db from "../db/index.js";
import {eq} from "drizzle-orm";
import {usersTable} from "../db/schema.js";
import {createHmac, randomBytes} from "node:crypto";

export const getUserController = async function (req, res) {
  const allUsers = await db.select().from(usersTable);
  return res.status(200).json({
    message: "Hello this is users get route",
    allUsers,
  });
};

export const signUpController = async function (req, res) {
  const {name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(401).json({
      message: "Bad request here.",
    });
  }

  const myUserTable = await db
    .select()
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (myUserTable.length) {
    return res.json({
      message: "The db for this email already exists.",
    });
  }

  const salt = randomBytes(256).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  const user = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    });

  return res.status(201).json({status: "success", data: user});
};

export const loginController = async function (req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(404).json({
      message: "The email and password are required to login.",
    });
  }

  const [userData] = await db
    .select({
      email: usersTable.email,
      password: usersTable.password,
      salt: usersTable.salt,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!userData) {
    return res.status(401).json({
      message: "User data is not found.",
    });
  }

  const userPass = userData.password;
  const userSalt = userData.salt;
  console.log(userPass, "FEEEE", userSalt);
  const hashCheck = createHmac("sha256", userSalt)
    .update(password)
    .digest("hex");

  if (hashCheck !== userPass) {
    return res.status(401).json({
      message: "The user credentials are incorrect.",
    });
  }

  return res.status(202).json({
    message: "User credentials fetched successfully.",
    userData,
  });
};
