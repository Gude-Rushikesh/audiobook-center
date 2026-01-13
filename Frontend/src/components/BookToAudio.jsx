// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function BookToAudio() {
//   const navigate = useNavigate();
//   const [collections, setCollections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/", { replace: true });
//   };

//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/collections"
//         );
//         setCollections(res.data);
//       } catch (err) {
//         console.error("Failed to load collections");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCollections();
//   }, []);

//   if (loading) {
//     return <p className="p-10">Loading collections...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-400">

//       {/* 🔝 TOP NAVBAR */}
//       <section className="bg-black h-14 px-6">
//         <div className="grid grid-cols-3 items-center h-full">
//           <div></div>

//           <h1 className="text-white text-2xl text-center">
//             Welcome to Audiobook Center
//           </h1>

//           <button
//             onClick={handleLogout}
//             className="justify-self-end text-black font-semibold
//                        bg-white rounded-md h-8 px-4"
//           >
//             Home
//           </button>
//         </div>
//       </section>

//       {/* 📚 COLLECTION POSTERS */}
//       <section
//         className="grid grid-cols-2 md:grid-cols-4
//                    gap-x-6 gap-y-14
//                    justify-items-center
//                    p-8 pt-16
//                    bg-linear-to-b
//                    from-[#FFF7E6] to-[#FFE3A3]"
//       >
//         {collections.map((collection) => (
//           <div
//             key={collection._id}
//             onClick={() =>
//               navigate(`/collection/${collection._id}`)
//             }
//             className="bg-black w-[180px] h-[270px]
//                        rounded-lg overflow-hidden shadow-lg
//                        hover:scale-105 transition-transform
//                        cursor-pointer"
//           >
//             <img
//               src={`http://localhost:5000/uploads/${collection.coverImage}`}
//               alt={collection.title}
//               className="w-full h-full"
//             />
//           </div>
//         ))}
//       </section>

//     </div>
//   );
// }


import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"
// import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;



const CATEGORY_MAP = [
      {
        title: "Fantasy & Epics",
        match: ["harry potter", "song of ice and fire", "dune"]
      },

      {
        title: "Romance & Emotion",
        match: [
          "twilight",
          "wuthering",
          "reasons",
          "jane eyre",
          "pride and prejudice",
          "enchanted april"
        ],
        order: [
        "pride and prejudice",
        "jane eyre",
        "wuthering heights",
        "twilight",
        "enchanted april"
        ]
      },

      {
        title: "Philosophy & Life",
        match: [
          "alchemist",
          "acres of diamonds"
        ]
      },

      {
        title: "Classics",
        match: [
          "gatsby",
          "catch",
          "dracula",
          "sherlock",
          "secret garden",
        ]
      },

      {
        title: "Science Fiction",
        match: [
          "dune",
          "time machine",
          "frankenstein"
        ]
      }
    ];

    const CATEGORY_STYLES = {
        "Fantasy & Epics": "bg-indigo-400 text-black font-semibold",
        "Romance & Emotion": "bg-rose-400 text-black font-semibold",
        "Philosophy & Life": "bg-amber-300 text-black font-semibold",
        "Classics": "bg-emerald-400 text-black font-semibold",
        "Science Fiction": "bg-sky-400 text-black font-semibold",
        };



export default function BookToAudio() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const rowRefs = useRef({});




  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await API.get(`/api/collections`);
        setCollections(res.data);
      } catch (err) {
        console.error("Failed to load collections");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);


  



      // 🔍 SEARCH FILTER (ADD THIS)
          const filteredCollections = searchQuery.trim()
            ? collections.filter(col =>
                col.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                col.author?.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : collections;

          // 🧭 CATEGORY LOGIC (UNCHANGED, JUST USE filteredCollections)
          const usedIds = new Set();

          const categorizedData = CATEGORY_MAP.map(category => {
            const items = filteredCollections.filter(col => {
              if (usedIds.has(col._id)) return false;

              const matched = category.match.some(key =>
                col.title.toLowerCase().includes(key) ||
                col.author?.toLowerCase().includes(key)
              );

              if (matched) {
                usedIds.add(col._id);
                return true;
              }

              return false;
            });

            return {
              title: category.title,
              items
            };
          }).filter(cat => cat.items.length > 0);


        useEffect(() => {
        if (!searchQuery) return;
        if (categorizedData.length === 0) return;

        const firstCategoryId = categorizedData[0].title;
        const el = document.getElementById(firstCategoryId);

        if (!el) return;

        const yOffset = -90; // navbar height
        const y =
          el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }, [searchQuery, categorizedData]);



    const scrollToId = (id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const yOffset = -90; // height of navbar + breathing space
      const y =
        el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF7E6]">
        <div className="w-10 h-10 border-2 border-black/20 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

        const BookCard = ({ collection }) => (
        <div
          onClick={() => navigate(`/collection/${collection._id}`)}
          className="relative min-w-40 sm:min-w-50 h-60 sm:h-75 md:h-82.5 rounded-2xl overflow-hidden
                    shadow-md cursor-pointer
                    transition-all duration-300
                    hover:-translate-y-2 hover:shadow-2xl"
        >
          <img
            src={`${API_BASE}/uploads/${collection.coverImage}`}
            alt={collection.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t
                          from-black/80 via-black/30 to-transparent
                          opacity-0 hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-semibold leading-snug">
                {collection.title}
              </p>
              <span className="inline-block mt-2 text-[11px]
                              px-2 py-0.5 rounded-full
                              bg-white/20 text-white tracking-wide">
                {collection.type === "series" ? "Series" : "Standalone"}
              </span>
            </div>
          </div>
        </div>
      );


  return (
    <div className="min-h-screen bg-[#000000]">

      {/* 🔝 NAVBAR */}
            <section className="bg-black h-14 px-6 sticky top-0 z-30">
              <div className="grid grid-cols-2 md:grid-cols-3 items-center h-full">

                {/* LEFT — BRAND */}
                <div
                  onClick={() => navigate("/")}
                  className="text-white text-lg md:text-2xl font-display font-medium cursor-pointer"
                >
                  Audiobook Center
                </div>

                {/* CENTER — SEARCH */}
                <div className="hidden md:flex justify-center">
                  <div className="flex items-center gap-2
                                  bg-white/90 rounded-full
                                  px-4 py-1.5 w-[60%]
                                  transition-all
                                  focus-within:ring-2 ring-black/20">

                    <span className="text-gray-500 text-sm">🔍</span>

                    <input
                      type="text"
                      placeholder="Search by title or author"
                      className="w-full bg-transparent outline-none
                                text-sm text-gray-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* RIGHT — ACTION */}
                <div className="flex justify-end">
                  <button
                    onClick={handleLogout}
                    className="bg-white text-black font-semibold font-display
                              rounded-md h-8 px-4"
                  >
                    Logout 
                  </button>
                </div>

              </div>
            </section>




      {/* 🎧 HERO SECTION 🅰️ HERO — Calm & Reflective*/}
            
      <section className="flex flex-col items-center justify-center
                          text-center px-6 sm:px-6 pt-16 sm:pt-18 pb-20 sm:pb-28">

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-semibold text-white leading-tight">
          Welcome to Audiobook Center
        </h2>

        <p className="max-w-2xl sm:max-w-2xl text-gray-900 mt-6 sm:mt-8 text-sm sm:text-base md:text-xl leading-relaxed font-display">
          A curated space for audiobooks — from epic fantasy and timeless classics
          to emotional stories and thought-provoking journeys.
          <br />
          Choose a world, press play, and let the story unfold.
        </p>

        <p className="mt-10 text-sm md:text-base lg:text-xl italic text-[#FFD700] font-semibold">
          “Listening to a story is one of the oldest forms of human connection.”
        </p>

        {/* soft divider */}
        <div className="w-20 h-0.5 bg-black/10 rounded-full mt-14" />

        <button
          onClick={() => scrollToId("categories")}
          className="mt-7 px-8 sm:px-10 py-3 rounded-full
                    bg-white text-black text-large font-semibold
                    tracking-wide shadow-sm
                    hover:bg-black/90 transition"
        >
          Explore Categories ↓
        </button>

      </section>



      {/* 🅱️ HERO — Inspired & Curious */}
        {/* <section className="flex flex-col items-center justify-center
                            text-center px-6 pt-20 pb-24">

          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Welcome to Audiobook Center
          </h2>

          <p className="max-w-2xl text-gray-700 mt-6 text-base md:text-lg leading-relaxed">
            Discover audiobooks across fantasy, classics, romance,
            and ideas that stay with you long after the story ends.
          </p>

          <p className="mt-6 text-sm md:text-base italic text-gray-500">
            “Listening to a story is one of the oldest forms of human connection.”
          </p>

          <button
            onClick={() => scrollToId("categories")}
            className="mt-10 px-10 py-3 rounded-full
                      bg-black text-white text-sm font-semibold
                      tracking-wide shadow-lg
                      hover:-translate-y-[2px]
                      hover:shadow-xl
                      transition-all duration-300"
          >
            Explore Categories ↓
          </button>

          visual cue
          <div className="mt-10 text-black/30 text-sm animate-bounce">
            ↓
          </div>

        </section> */}



      {/* 🧭 CATEGORY QUICK NAV — Colored */}
      <section className="flex flex-wrap justify-center  gap-4 md:gap-3
                          px-6 pb-16">

        {categorizedData.map((category) => (
          <button
            key={category.title}
            onClick={() => scrollToId(category.title)}
            className={`border-black px-8 py-4 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full
                        text-xs sm:text-sm font-semibold
                        transition-all
                        hover:-translate-y-1 hover:shadow-sm
                        ${CATEGORY_STYLES[category.title]}`}
          >
            {category.title}
          </button>
        ))}

      </section>




      {/* 📚 CATEGORY ROWS */}
      <section id="categories" className="space-y-20 px-6 pb-24 font-display">
        
        {categorizedData.map((category) => (
          <div
              key={category.title}
              id={category.title}
              className="bg-white/40 backdrop-blur-sm
                        rounded-2xl px-6 py-6 shadow-sm"
            >


            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
                
            <div className="relative">
              {/* RIGHT ARROW */}
              <button
                onClick={() =>
                  rowRefs.current[category.title]?.scrollBy({
                    left: 400,
                    behavior: "smooth"
                  })
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                          bg-white/80 backdrop-blur
                          rounded-full w-10 h-10
                          flex items-center justify-center
                          shadow hover:bg-white transition"
              >→</button>

                {/* SCROLL ROW */}
                <div
                  ref={(el) => (rowRefs.current[category.title] = el)}
                  className="flex gap-6 sm:gap-10 md:gap-14 overflow-x-auto pb-4 pt-2 no-scrollbar"
                >
                  {category.items.map((collection) => (
                    <BookCard key={collection._id} collection={collection} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }
