import {eq} from "drizzle-orm";
import db from "../db/index.js";
import {userSession, usersTable} from "../db/schema.js";

const userMiddleware = async function (req, res, next) {
  const sessionId = req.headers["session-id"];

  if (!sessionId) {
    return res.status(403).json({
      message: "Unauthorized user",
    });
  }

  const [data] = await db
    .select({
      name: usersTable.name,
      email: usersTable.email,
      userId: usersTable.id,
      id: userSession.id,
    })
    .from(userSession)
    .rightJoin(usersTable, eq(usersTable.id, userSession.userId))
    .where((table) => eq(table.id, sessionId));

  if (!data) {
    return res.status(403).json({
      message: "Unauthorized user below",
    });
  }

  if (data) {
    req.user = data;
    return next();
  }

  next();
};
export default userMiddleware;
