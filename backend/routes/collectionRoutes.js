import express from "express";
import Collection from "../models/Collection.js";

const router = express.Router();

/* =====================
   CREATE COLLECTION
===================== */
router.post("/", async (req, res) => {
  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json(collection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================
   GET ALL COLLECTIONS
===================== */
router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =====================
   GET COLLECTION BY ID
===================== */
router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate("books")
      .populate("bookId");

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  /* =====================
   UPDATE COLLECTION (PATCH)
  ===================== */
  router.patch("/:id", async (req, res) => {
    try {
      const updatedCollection = await Collection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedCollection) {
        return res.status(404).json({ error: "Collection not found" });
      }

      res.json(updatedCollection);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


export default router;
