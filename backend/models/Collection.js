import mongoose from "mongoose";

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

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

collectionSchema.pre("validate", function setSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }

  next();
});

export default mongoose.model("Collection", collectionSchema);
