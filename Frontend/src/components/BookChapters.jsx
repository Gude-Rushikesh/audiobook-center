import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";

const API_BASE = import.meta.env.VITE_API_URL;


export default function BookChapters({ onSelectChapter }) {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const res = await axios.get(
          `${API_BASE}/api/books/${bookId}`
        );
        setBook(res.data);
      } catch (err) {
        console.error("Failed to load book", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

      if (loading) {
      return (
        <div
          className="min-h-screen flex items-center justify-center transition-opacity duration-300"
          style={{ backgroundColor: "#0b0f1a", color: "#ffffff" }}
        >
          <div className="text-center space-y-4">
            <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            <p className="text-sm opacity-70">Loading…</p>
          </div>
        </div>
      );
    }


  if (!book) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        Book not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white pb-40">

      {/* 🔙 BACK */}
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm bg-white/10 hover:bg-white/20
                     transition px-4 py-2 rounded-md"
        >
          ← Back
        </button>
      </div>

      {/* 🎬 HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10">

        {/* Cover */}
        <div className="w-65 h-95 rounded-2xl overflow-hidden
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        ring-1 ring-white/10">
          <img
            src={`${API_BASE}/uploads/${book.coverImage}`}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 font-display space-y-4">
          <h1 className="text-5xl md:text-5xl font-bold leading-tight">
            {book.title}
          </h1>

          <p className="text-xl text-white/70">
            by <span className="text-white font-medium">{book.author}</span>
          </p>

          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            {book.description}
          </p>

          {/* 🔹 FEATURE STRIP */}
          <div className="flex gap-6 pt-4 text-lg text-white/70">
            <div>
              <span className="block text-white   font-semibold">
                {book.chapters.length}
              </span>
              Chapters
            </div>

            <div>
              <span className="block text-white font-semibold">
                Audiobook
              </span>
              Format
            </div>

            <div>
              <span className="block text-white font-semibold">
                🎧
              </span>
              Immersive
            </div>
          </div>
        </div>
      </section>

      {/* 📑 CHAPTER LIST */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-semibold mb-6">
          Chapters
        </h2>

        {book.chapters.length === 0 ? (
          <p className="text-white/60">No chapters available</p>
        ) : (
          <div className="space-y-4">
            {book.chapters.map((chapter, index) => {
              const isActive = selectedChapter?._id === chapter._id;

              return (
                <div
                  key={chapter._id}
                  onClick={() => {
                    setSelectedChapter(chapter);
                    onSelectChapter?.(chapter);
                  }}
                  className={`
                    group cursor-pointer
                    rounded-xl px-6 py-4
                    flex justify-between items-center
                    transition-all duration-300
                    ${isActive
                      ? "bg-white/15 ring-1 ring-white/20"
                      : "bg-white/5 hover:bg-white/10"}
                  `}
                >
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        text-sm font-semibold
                        ${isActive
                          ? "bg-white text-black"
                          : "bg-white/10 text-white/70 group-hover:bg-white/20"}
                      `}
                    >
                      ▶
                    </div>

                    <div>
                      <p className="font-medium">
                        Chapter {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="text-sm text-white/60">
                        {chapter.title}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <span className="text-sm text-white/60 tabular-nums">
                    {chapter.duration}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 🎧 PLAYER */}
      <AudioPlayer chapter={selectedChapter} />
    </div>
  );
}


