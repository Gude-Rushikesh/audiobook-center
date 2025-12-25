// import express from "express";
// import Chapter from "../models/Chapter.js";
// import Book from "../models/Book.js";

// const router = express.Router();

// /* =========================
//    CREATE CHAPTER
// ========================= */
// router.post("/", async (req, res) => {
//   try {
//     const chapter = new Chapter(req.body);
//     await chapter.save();

//     // Link chapter to book
//     await Book.findByIdAndUpdate(
//       chapter.bookId,
//       { $push: { chapters: chapter._id } }
//     );

//     res.status(201).json(chapter);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// /* =========================
//    GET CHAPTERS BY BOOK ID
// ========================= */
// router.get("/book/:bookId", async (req, res) => {
//   try {
//     const chapters = await Chapter.find({
//       bookId: req.params.bookId
//     });

//     res.json(chapters);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;








import express from "express";
import Chapter from "../models/Chapter.js";
import Book from "../models/Book.js";

const router = express.Router();

/* =========================
   CREATE CHAPTER (single OR bulk)
========================= */
router.post("/", async (req, res) => {
  try {
    // 🔹 BULK INSERT
    if (Array.isArray(req.body)) {
      const chapters = await Chapter.insertMany(req.body);

      // Link all chapters to their books
      const updates = chapters.map((ch) =>
        Book.findByIdAndUpdate(
          ch.bookId,
          { $push: { chapters: ch._id } }
        )
      );

      await Promise.all(updates);

      return res.status(201).json(chapters);
    }

    // 🔹 SINGLE INSERT (unchanged behavior)
    const chapter = new Chapter(req.body);
    await chapter.save();

    await Book.findByIdAndUpdate(
      chapter.bookId,
      { $push: { chapters: chapter._id } }
    );

    res.status(201).json(chapter);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =========================
   GET CHAPTERS BY BOOK ID
========================= */
router.get("/book/:bookId", async (req, res) => {
  try {
    const chapters = await Chapter.find({
      bookId: req.params.bookId
    });

    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
