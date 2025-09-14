const express = require("express");
const {
  getAllAuthors,
  getAuthorById,
  addAuthorData,
  searchAuthor,
  removeAutor,
} = require("../controllers/author.controller");

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/id/:id", getAuthorById);
router.get("/search", searchAuthor);
router.post("/add-author", addAuthorData);
router.delete("/delete/:id", removeAutor);

module.exports = router;
