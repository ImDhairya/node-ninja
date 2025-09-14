import db from "../db/index.js";
import {eq} from "drizzle-orm";
import {userSession, usersTable} from "../db/schema.js";
import {createHmac, randomBytes} from "node:crypto";
import jwt from "jsonwebtoken";

export const getUserController = async function (req, res) {
  const allUsers = await db.select().from(usersTable);
  return res.status(200).json({
    message: "Hello this is users get route",
    allUsers,
  });
};

export const sessionRequest = async function (req, res) {
  const user = req.user;

  return res.json(user);
};

export const updateUser = async function (req, res) {
  const {name, email, password} = req.body;

  const user = req.user;
  if (!user) {
    return res.status(403).json({
      message: "Unauthorized user ",
    });
  }
  if (!name || !email || !password) {
    return res.status(401).json({
      message: "Bad request here.",
    });
  }

  await db
    .update(usersTable)
    .set({name, email, password})
    .where(eq(usersTable.id, user.userId));

  return res.status(291).json({
    message: " Thu name is updated",
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
      id: usersTable.id,
      name: usersTable.name,
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
  const hashCheck = createHmac("sha256", userSalt)
    .update(password)
    .digest("hex");

  if (hashCheck !== userPass) {
    return res.status(401).json({
      message: "The user credentials are incorrect.",
    });
  }

  const payload = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
  };
  console.log(payload, "halle");

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  res.cookie("authorization", token);

  const [session] = await db
    .insert(userSession)
    .values({
      userId: userData.id,
    })
    .returning({id: userSession.id});
  return res.status(202).json({
    message: "User credentials fetched successfully.",
    userData,
    session,
  });
};
