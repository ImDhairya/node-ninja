const express = require("express");
const bookRouter = require("./routes/books.routes");
const authorRouter = require("./routes/author.routes");
require("dotenv/config");

const app = express();
const port = 8000;

app.use(express.json());
app.use("/books", bookRouter);
app.use("/author", authorRouter);

// app.get("/books", (req, res) => {
//   res.setHeader("x-piy", "dhairya");
//   res.json(data);
// });

// app.get("/books/:id", (req, res) => {
//   const id = req.params.id;
//   const myData = data.find((el) => el.id == id);
//   res.json(myData);
// });

// app.post("/add-book", (req, res) => {
//   const data = req.body;
//   console.log(data);
// });

app.listen(port, () => {
  console.log(`Server is running up on port ${port}`);
});
