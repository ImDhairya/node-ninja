const express = require("express");
const {
  getAllBooks,
  createBooks,
  deleteBookById,
  getBooksById,
  searchBook,
} = require("../controllers/books.controller");
const router = express.Router();

router.get("/", getAllBooks);
router.get("/search", searchBook);
router.get("/get/:id", getBooksById);
router.post("/add-book", createBooks);
router.delete("/delete/:id", deleteBookById);

module.exports = router;
