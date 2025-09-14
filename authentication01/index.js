import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const DIARY = {};
const EMAILS = new Set();

app.post("/signup", (req, res) => {
  const {name, email, password} = req.body;

  if (EMAILS.has(email)) {
    return res.status(301).json({
      message: "The user is already present please login.",
    });
  }

  const token = `${Date.now()}`;
  DIARY[token] = {name, email, password, token};

  EMAILS.add(email);

  return res.status(201).json({
    message: "Hey your entry is registered.",
    data: DIARY[token],
  });
});

app.get("/me", (req, res) => {
  const {token} = req.body;

  if (!token) {
    return res.status(400).json({
      message: "Missing token",
    });
  }

  if (!(token in DIARY)) {
    return res.status(401).json({
      message: "Your not authorized to access this route.",
    });
  }

  const dbTokenDetails = DIARY[token];

  return res.status(200).json({
    message: "Here is your details my friend.",
    dbTokenDetails,
  });
});

app.listen(port, () => {
  console.log("The app is listening on port ", port);
});
