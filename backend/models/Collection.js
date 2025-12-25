import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["series", "standalone"],
      required: true,
    },

    description: {
      type: String,
    },

    coverImage: {
      type: String,
      required: true,
    },

    // For series
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],

    // For standalone
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    // ✅ ADD THIS
    theme: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
