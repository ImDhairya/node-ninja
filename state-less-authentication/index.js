import express from "express";
import userRouter from "./routes/user.routes.js";
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  return res.json("Hello world ");
});

app.use(express.json());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
