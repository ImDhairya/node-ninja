import express from "express";
import {
  getUserController,
  loginController,
  sessionRequest,
  signUpController,
  updateUser,
} from "../controllers/user.controller.js";
import userMiddleware from "../middlewares/session.middleware.js";
const router = express.Router();

router.get("/", getUserController);
router.get("/session", userMiddleware, sessionRequest);
router.patch("/update", userMiddleware, updateUser);
router.post("/signup", userMiddleware, signUpController);
router.post("/login", loginController);

export default router;
