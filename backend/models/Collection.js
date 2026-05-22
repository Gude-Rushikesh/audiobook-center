import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // ✅ ADD THIS — clean URL slug e.g. "harry-potter-series"
    slug: {
      type: String,
      unique: true,
      sparse: true, // allows null for old records without breaking uniqueness
      lowercase: true,
      trim: true,
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

    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    theme: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.model("Collection", collectionSchema);
