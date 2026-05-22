import express from "express";
import mongoose from "mongoose";
import Collection from "../models/Collection.js";

const router = express.Router();

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const populateCollection = (query) => query.populate("books").populate("bookId");

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
   GET COLLECTION BY ID OR SLUG
===================== */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };

    let collection = await populateCollection(Collection.findOne(query));

    if (!collection && !mongoose.Types.ObjectId.isValid(id)) {
      const collections = await populateCollection(Collection.find());
      collection = collections.find((item) => slugify(item.title) === id);
    }

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
