import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import { Storage, File } from "megajs";   // ⬅ correct import

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));


// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/chapters", chapterRoutes);




// =========================================
// ✅ STREAM AUDIO DIRECTLY FROM MEGA
// =========================================
app.get("/api/stream", async (req, res) => {
  try {
    const fileLink = req.query.link; // frontend sends ?link=....

    if (!fileLink)
      return res.status(400).json({ error: "Mega link missing" });

    // ⬅ FIX: use File.fromURL, NOT mega.File
    const file = File.fromURL(fileLink);

    file.loadAttributes((err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Accept-Ranges", "bytes");

      file.download().pipe(res); // stream audio
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});





