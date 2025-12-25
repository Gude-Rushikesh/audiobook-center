import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
    },

    // MEGA file link (private)
    megaLink: {
      type: String,
      required: true,
    },

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", chapterSchema);
