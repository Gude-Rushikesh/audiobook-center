import express from "express";
import Book from "../models/Book.js";
import Collection from "../models/Collection.js";

const router = express.Router();

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* =========================
   CREATE BOOK
========================= */
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    // Link book to collection
    await Collection.findByIdAndUpdate(
      book.collectionId,
      { $push: { books: book._id } }
    );

    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =========================
   GET BOOK BY ID OR SLUG (IMPORTANT)
========================= */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = id.match(/^[a-f\d]{24}$/i) ? { _id: id } : { slug: id };

    let book = await Book.findOne(query).populate("chapters");

    if (!book && !id.match(/^[a-f\d]{24}$/i)) {
      const books = await Book.find().populate("chapters");
      book = books.find((item) => slugify(item.title) === id);
    }

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
