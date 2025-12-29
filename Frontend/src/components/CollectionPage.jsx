
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resolveMedia } from "../utils/resolveMedia";
const API_BASE = import.meta.env.VITE_API_URL;


export default function CollectionPage() {
  const { collectionId } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState(null);
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);

  const bgAudioRef = useRef(null);
  const whooshRef = useRef(null);

  /* -------------------------
     Fetch collection
  -------------------------- */
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const res = await fetch(
          `${API_BASE}/api/collections/${collectionId}`
        );
        const data = await res.json();

        setCollection(data);
        setTheme(data.theme || getDefaultTheme());
      } catch (err) {
        console.error("Failed to load collection", err);
        setTheme(getDefaultTheme());
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  /* -------------------------
     Standalone redirect
  -------------------------- */
  useEffect(() => {
  if (collection?.type === "standalone" && collection.bookId) {
    const bookId =
      typeof collection.bookId === "object"
        ? collection.bookId._id
        : collection.bookId;

    navigate(`/chapters/${bookId}`, { replace: true });
  }
}, [collection, navigate]);

  /* -------------------------
     Ambient audio
  -------------------------- */
  useEffect(() => {
    if (!bgAudioRef.current || !theme?.audio?.ambient) return;

    bgAudioRef.current.volume = theme.audio.ambient.volume ?? 0.25;

    if (theme.audio.ambient.autoplay && !muted) {
      bgAudioRef.current.play().catch(() => {});
    }
  }, [theme, muted]);

  /* -------------------------
     Guards (VERY IMPORTANT)
  -------------------------- */
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

  if (!collection) return <p className="p-10">Collection not found</p>;
  if (!theme) return <p className="p-10">Loading theme…</p>;
  if (collection.type === "standalone") return null;

  const t = theme;

  const heroHeight =
    window.innerWidth >= 768
      ? t.hero.height.desktop
      : t.hero.height.mobile;

  const gradientDirection =
    t.hero.gradient.direction === "to-right"
      ? "to right"
      : t.hero.gradient.direction;

  /* =========================
     RENDER
  ========================== */
  return (
    <div
      className="min-h-screen pb-24"
      style={{
        backgroundColor: t.page.background,
        color: t.page.textColor,
      }}
    >
      {/* AUDIO */}
      {t.audio.ambient?.src && (
      <audio
        ref={bgAudioRef}
        src={resolveMedia(t.audio.ambient.src)}
        loop={t.audio.ambient.loop}
        muted={muted}
        preload="auto"
      />
      )}

    {t.audio.interaction?.bookClick && (
      <audio
        ref={whooshRef}
        src={resolveMedia(t.audio.interaction.bookClick)}
        preload="auto"
      />
      )}

      {/* 🔝 TOP BAR */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3">
        {t.topBar.showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="text-sm sm:text-base px-3 py-1.5 bg-black/40 sm:bg-black/70 opacity-80 rounded hover:bg-white hover:text-black">
            ← Back
          </button>
        )}

        <h1 className="text-xl sm:text-3xl md:text-5xl text-center font-display font-semibold">
          {collection.title}
          </h1>

        {t.topBar.showSoundToggle && t.audio.ambient?.src && (
          <button
            onClick={() => setMuted((m) => !m)}
            className="text-sm opacity-80 hover:opacity-100"
          >
            {muted ? "🔇 Muted" : "🔊 Sound"}
            <span className="hidden sm:inline ml-1">
              {muted ? "muted" : "Sound"}
            </span>
          </button>
        )}
      </div>

      {/* 🧙 HERO SECTION (TEMPLATE-SAFE) */}
      <div
        className="relative overflow-hidden min-h-55 sm:min-h-65 md:min-h-95"
        style={{ height: heroHeight }}
      >
        {/* Base gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0b0f1a] via-black to-[#0b0f1a]" />

        {/* Hero image (DATA DRIVEN – NOT HARDCODED) */}
        {t.hero.image?.src && (
          <img
            src={resolveMedia(t.hero.image.src)}
            alt={collection.title}
            className="
              absolute
              left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2
              object-contain
              pointer-events-none
            "
            style={{
              width:
                window.innerWidth >= 768
                  ? t.hero.image.width.desktop
                  : "90vw",
              opacity: t.hero.image.opacity ?? 0.6,
            }}
          />
        )}


      {/* Bottom fade into page background
        <div
          className="absolute bottom-0 left-0 w-full h-24"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0), #0b0f1a)",
          }}
        /> */}


      </div>




      {/* 📚 BOOKS RAIL */}
      <section className="mt-10 px-10">
        <div
          className="flex overflow-x-auto pb-6 no-scrollbar"
          style={{ gap: window.innerWidth < 640 ? "24px": t.booksRail.gap }}
        >
          {collection.books.map((book) => (
            <div
              key={book._id}
              onClick={() => {
                whooshRef.current?.play();
                setTimeout(() => {
                  navigate(`/chapters/${book._id}`);
                }, t.booksRail.card.hover.transitionMs);
              }}
              onMouseEnter={(e) => {
                if (window.innerWidth < 768) return;
                if (!t.booksRail.card.hover.lift) return;
                e.currentTarget.style.transform = `translateY(-${t.booksRail.card.hover.liftAmount})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
              className="
                mt-4
                ml-3
                mr-2
                rounded-xl
                overflow-hidden
                cursor-pointer
                transition-all
                duration-300
                shadow-lg
                hover:shadow-indigo-500/40
                hover:ring-2
                hover:ring-indigo-400
              "
              style={{
                minWidth: 
                window.innerWidth < 640 ? "190px":t.booksRail.card.minWidth,
                backgroundColor: t.booksRail.card.background,
                transitionDuration: `${t.booksRail.card.hover.transitionMs}ms`,
              }}
            >
              <div style={{ height: 
              window.innerWidth < 640 ? "280px" : t.booksRail.card.image.height,
               }}>
                <img
                  src={`${API_BASE}/uploads/${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3">
                <p className="font-semibold text-sm">{book.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📖 EXTRA SECTION */}
      {t.extraSection.enabled && (
        <section className="px-6 sm:px-10 mt-14 sm:mt-20 max-w-3xl text-gray-300">
          <h3 className="text-xl font-semibold text-white mb-3">
            {t.extraSection.title}
          </h3>
          <p>{t.extraSection.content}</p>
        </section>
      )}
    </div>
  );
}

/* =========================
   DEFAULT THEME (SAFE)
========================== */
function getDefaultTheme() {
  return {
    page: { background: "#0b0f1a", textColor: "#ffffff" },
    hero: {
      height: { mobile: "320px", desktop: "380px" },
      gradient: {
        from: "#0b0f1a",
        via: "#000000",
        to: "#0b0f1a",
        direction: "to right",
      },
      image: {
        src: "",
        width: { mobile: "620px", desktop: "700px" },
        opacity: 0.6,
      },
    },
    audio: {
      ambient: { src: "", loop: true, autoplay: false, volume: 0.25 },
      interaction: { bookClick: "" },
    },
    topBar: {
      showBackButton: true,
      showSoundToggle: true,
      titleStyle: { fontSize: "5xl", fontWeight: "bold" },
    },
    booksRail: {
      gap: "56px",
      card: {
        minWidth: "220px",
        background: "#12182a",
        hover: {
          lift: true,
          liftAmount: "12px",
          transitionMs: 300,
        },
        image: { height: "320px" },
      },
    },
    extraSection: {
      enabled: false,
      title: "",
      content: "",
    },
  };
}













// style={{
//   backgroundColor: theme?.page?.background || "#0b0f1a",
//   color: theme?.page?.textColor || "#ffffff"
// }}