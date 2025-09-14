import {eq} from "drizzle-orm";
import db from "../db/index.js";
import jwt from "jsonwebtoken";
import {userSession, usersTable} from "../db/schema.js";

const userMiddleware = async function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return next();
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded, "Hidecoded");
  if (!decoded) {
    return res.json({
      message: "Unable to authenticate based on token.",
    });
  }

  const data = {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
  };

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
