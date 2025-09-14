import express from "express";
import {
  getUserController,
  loginController,
  signUpController,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", getUserController);
router.post("/signup", signUpController);
router.post("/login", loginController);

export default router;
