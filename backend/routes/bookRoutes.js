import express from "express";
import Book from "../models/Book.js";
import Collection from "../models/Collection.js";

const router = express.Router();

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
   GET BOOK BY ID (IMPORTANT)
========================= */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("chapters");

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
