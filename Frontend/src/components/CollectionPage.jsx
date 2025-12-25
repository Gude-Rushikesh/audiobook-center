// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// export default function CollectionPage() {
//   const navigate = useNavigate();
//   const { collectionId } = useParams();

//   const [collection, setCollection] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch collection
//   useEffect(() => {
//     const fetchCollection = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/collections/${collectionId}`
//         );
//         setCollection(res.data);
//       } catch (err) {
//         console.error("Failed to load collection", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCollection();
//   }, [collectionId]);

//   // Redirect if standalone
//   // useEffect(() => {
//   //   if (collection?.type === "standalone") {
//   //     navigate(`/Chapters/${collection.bookId}`, { replace: true });
//   //   }
//   // }, [collection, navigate]);

//   // if (loading) {
//   //   return <p className="p-10">Loading...</p>;
//   // }

//   // if (!collection) {
//   //   return <p className="p-10">Collection not found</p>;
//   // }

//   // if (collection.type === "standalone") return null;


//       useEffect(() => {
//       if (collection?.type === "standalone" && collection.bookId) {
//         const bookId =
//           typeof collection.bookId === "object"
//             ? collection.bookId._id
//             : collection.bookId;

//         navigate(`/chapters/${bookId}`, { replace: true });
//       }
//     }, [collection, navigate]);

//     if (loading) {
//       return <p className="p-10">Loading...</p>;
//     }

//     if (!collection) {
//       return <p className="p-10">Collection not found</p>;
//     }

//     if (collection.type === "standalone") {
//       return null;
//     }



//   return (
//     <div className="min-h-screen bg-white p-10">

//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 bg-black text-white px-4 py-2 rounded"
//       >
//         ← Back
//       </button>

//       {/* Collection Info */}
//       <h1 className="text-4xl font-bold mb-3">
//         {collection.title}
//       </h1>

//       <p className="text-gray-600 mb-10 max-w-2xl">
//         {collection.description}
//       </p>

//       {/* Books */}
//       <h2 className="text-2xl font-semibold mb-4">Books</h2>

//       <div className="space-y-4 max-w-xl">
//         {collection.books.map((book) => (
//           <div
//             key={book._id}
//             onClick={() => navigate(`/book/${book._id}`)}
//             className="bg-white p-4 rounded-lg shadow
//                        hover:bg-gray-50 cursor-pointer
//                        flex justify-between items-center"
//           >
//             <span className="font-medium">{book.title}</span>
//             <span className="text-sm text-gray-500">→</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// export default function CollectionPage() {
//   const navigate = useNavigate();
//   const { collectionId } = useParams();

//   const [collection, setCollection] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🎵 Ambient audio refs
//   const bgAudioRef = useRef(null);
//   const whooshRef = useRef(null);
//   const [muted, setMuted] = useState(false);

//   // ======================
//   // Fetch collection
//   // ======================
//   useEffect(() => {
//     const fetchCollection = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/collections/${collectionId}`
//         );
//         setCollection(res.data);
//       } catch (err) {
//         console.error("Failed to load collection", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCollection();
//   }, [collectionId]);

//   // ======================
//   // Standalone redirect (UNCHANGED)
//   // ======================
//   useEffect(() => {
//     if (collection?.type === "standalone" && collection.bookId) {
//       const bookId =
//         typeof collection.bookId === "object"
//           ? collection.bookId._id
//           : collection.bookId;

//       navigate(`/chapters/${bookId}`, { replace: true });
//     }
//   }, [collection, navigate]);

//   // ======================
//   // Start ambient music
//   // ======================
//   useEffect(() => {
//     if (bgAudioRef.current) {
//       bgAudioRef.current.volume = 2;
//       bgAudioRef.current.play().catch(() => {});
//     }
//   }, []);

//   if (loading) return <p className="p-10">Loading...</p>;
//   if (!collection) return <p className="p-10">Collection not found</p>;
//   if (collection.type === "standalone") return null;

//   return (
//     <div className="min-h-screen bg-[#0b0f1a] text-white pb-24">

//       {/* 🎵 AUDIO ELEMENTS */}
//       <audio
//         ref={bgAudioRef}
//         src="http://localhost:5000/uploads/hedwig.mp3"
//         loop
//         muted={muted}
//         preload="auto"
//       />
//       <audio
//         ref={whooshRef}
//         src="/audio/whoosh.mp3"
//         preload="auto"
//       />

//       {/* 🔝 TOP BAR */}
//       <div className="flex items-center justify-between px-8 py-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-black/70 px-4 py-2 rounded hover:bg-black"
//         >
//           ← Back
//         </button>

//         <h1 className="text-5xl font-bold mb-4">
//           {collection.title}
//         </h1>

//         <button
//           onClick={() => setMuted((m) => !m)}
//           className="text-sm opacity-80 hover:opacity-100"
//         >
//           {muted ? "🔇 Muted" : "🔊 Sound"}
//         </button>
//       </div>


//       {/* 🧙 HERO STRIP
//       <section className="px-10 py-14 bg-linear-to-r from-indigo-900 via-black to-indigo-900">
//         <h1 className="text-5xl font-extrabold mb-4">
//           {collection.title}
//         </h1>
//         <p className="text-lg text-gray-300 max-w-2xl">
//           {collection.description}
//         </p>
//       </section> */}


//      {/* HERO SECTION */}
// <div className="relative h-80 md:h-[380px] overflow-hidden">

//   {/* 1️⃣ Base gradient background */}
//   <div
//     className="absolute inset-0
//                bg-linear-to-r
//                from-[#0b0f1a] via-black to-[#0b0f1a]"
//   />

//   {/* 2️⃣ Centered premium image */}
//   <img
//     src="http://localhost:5000/uploads/image.png"
//     alt="Wizarding World"
//     className="
//       absolute
//       left-1/2 top-1/2
//       -translate-x-1/2 -translate-y-1/2
//       w-[620px] md:w-[700px]
//       opacity-70
//       object-contain
//       pointer-events-none
//       select-none
//     "
//   />

//   {/* 3️⃣ Content (LEFT ONLY)
//   <div
//     className="relative z-10 h-full max-w-7xl mx-auto
//                px-8 flex flex-col justify-center"
//   >
//     <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
//       {collection.title}
//     </h2>

//     <p className="text-white/80 max-w-xl text-lg">
//       {collection.description}
//     </p>
//   </div> */}

// </div>



//       {/* 📚 BOOK RAIL */}
//       <section className="mt-10 px-15">
//         <h2 className="text-2xl font-semibold mb-6">
//           Harry Potter Collection 
//         </h2>

//         <div className="flex gap-14 overflow-x-auto pb-6 scrollbar-hide">
//           {collection.books.map((book) => (
//             <div
//               key={book._id}
//               onClick={() => {
//                 whooshRef.current?.play();
//                 setTimeout(() => {
//                   navigate(`/book/${book._id}`);
//                 }, 300);
//               }}
//               className="
//                 mt-4
//                 ml-2
//                 mr-2
//                 min-w-[220px]
//                 bg-[#12182a]
//                 rounded-xl
//                 overflow-hidden
//                 shadow-xl
//                 cursor-pointer
//                 transition
//                 duration-300
//                 hover:-translate-y-3
//                 hover:shadow-indigo-500/40
//                 hover:ring-2
//                 hover:ring-indigo-400
//               "
//             >
//               <div className="h-80 bg-black">
//                 <img
//                   src={`http://localhost:5000/uploads/${book.coverImage}`}
//                   alt={book.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="p-2">
//                 <p className="font-semibold text-sm">
//                   {book.title}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ✨ EXTRA LORE / INFO */}
//       <section className="px-10 mt-20 text-gray-300 max-w-3xl">
//         <h3 className="text-xl font-semibold mb-3 text-white">
//           About this world
//         </h3>
//         <p className="leading-relaxed">
//           Step into a universe where magic shapes destiny, friendships
//           are forged in fire, and every chapter brings you closer to
//           legend. Choose a book to begin your journey.
//         </p>
//       </section>
//     </div>
//   );
// }


// ============================================
// GENERIC COLLECTION PAGE TEMPLATE
// ============================================
// NOTE: This uses react-router-dom and axios which you'll need in your project
// For use in your actual application, not in Claude artifacts

  // import { useEffect, useRef, useState } from "react";
  // import { useNavigate, useParams } from "react-router-dom";
  // import axios from "axios";

  // export default function CollectionPage() {
  //   // const navigate = useNavigate();
  //   // const { collectionId } = useParams();
    
  //   // For demonstration purposes - replace with actual router params
  //   const collectionId = "demo-collection";

  //   const [collection, setCollection] = useState(null);
  //   const [theme, setTheme] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   const bgAudioRef = useRef(null);
  //   const whooshRef = useRef(null);
  //   const [muted, setMuted] = useState(false);

  //   // Fetch collection + theme metadata
  //   useEffect(() => {
  //     const fetchCollection = async () => {
  //       try {
  //         // Replace with your actual fetch call
  //         // const res = await axios.get(`http://localhost:5000/api/collections/${collectionId}`);
  //         const res = await fetch(`http://localhost:5000/api/collections/${collectionId}`);
  //         const data = await res.json();
          
  //         setCollection(data);
          
  //         // Fetch theme - adjust based on your API structure
  //         if (data.theme) {
  //           setTheme(data.theme);
  //         } else {
  //           // const themeRes = await axios.get(`http://localhost:5000/api/collections/${collectionId}/theme`);
  //           const themeRes = await fetch(`http://localhost:5000/api/collections/${collectionId}/theme`);
  //           const themeData = await themeRes.json();
  //           setTheme(themeData.theme);
  //         }
  //       } catch (err) {
  //         console.error("Failed to load collection", err);
  //         setTheme(getDefaultTheme());
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchCollection();
  //   }, [collectionId]);

  //   // Standalone redirect
  //   useEffect(() => {
  //     if (collection?.type === "standalone" && collection.bookId) {
  //       const bookId =
  //         typeof collection.bookId === "object"
  //           ? collection.bookId._id
  //           : collection.bookId;

  //       // Replace with your router navigation
  //       // navigate(`/chapters/${bookId}`, { replace: true });
  //       window.location.href = `/chapters/${bookId}`;
  //     }
  //   }, [collection]);

  //   // Start ambient music
  //   useEffect(() => {
  //     if (bgAudioRef.current && theme?.audio?.ambient) {
  //       bgAudioRef.current.volume = theme.audio.ambient.volume || 0.25;
  //       if (theme.audio.ambient.autoplay) {
  //         bgAudioRef.current.play().catch(() => {});
  //       }
  //     }
  //   }, [theme]);

  //   const getDefaultTheme = () => ({
  //     page: { background: "#0b0f1a", textColor: "#ffffff" },
  //     hero: {
  //       height: { mobile: "320px", desktop: "380px" },
  //       gradient: { from: "#0b0f1a", via: "#000000", to: "#0b0f1a" },
  //       image: {
  //         src: "",
  //         width: { mobile: "620px", desktop: "700px" },
  //         opacity: 0.7
  //       }
  //     },
  //     audio: {
  //       ambient: { src: "", loop: true, autoplay: true, volume: 0.25 },
  //       interaction: { bookClick: "/audio/whoosh.mp3" }
  //     },
  //     topBar: {
  //       showBackButton: true,
  //       showSoundToggle: true,
  //       titleStyle: { fontSize: "5xl", fontWeight: "bold" }
  //     },
  //     booksRail: {
  //       gap: "56px",
  //       card: {
  //         minWidth: "220px",
  //         background: "#12182a",
  //         hover: {
  //           liftAmount: "12px",
  //           glowColor: "indigo-400",
  //           transitionMs: 300
  //         },
  //         image: { height: "320px" }
  //       }
  //     },
  //     extraSection: {
  //       enabled: true,
  //       title: "About this world",
  //       content: "Explore this collection."
  //     }
  //   });

  //   if (loading) return <p className="p-10">Loading...</p>;
  //   if (!collection) return <p className="p-10">Collection not found</p>;
  //   if (collection.type === "standalone") return null;

  //   const t = theme || getDefaultTheme();

  //   return (
  //     <div 
  //       className="min-h-screen pb-24"
  //       style={{ backgroundColor: t.page.background, color: t.page.textColor }}
  //     >
  //       {/* Audio elements */}
  //       {t.audio.ambient.src && (
  //         <audio
  //           ref={bgAudioRef}
  //           src={t.audio.ambient.src}
  //           loop={t.audio.ambient.loop}
  //           muted={muted}
  //           preload="auto"
  //         />
  //       )}
  //       {t.audio.interaction.bookClick && (
  //         <audio ref={whooshRef} src={t.audio.interaction.bookClick} preload="auto" />
  //       )}

  //       {/* Top bar */}
  //       <div className="flex items-center justify-between px-8 py-4">
  //         {t.topBar.showBackButton && (
  //           <button
  //             onClick={() => window.history.back()}
  //             className="bg-black/70 px-4 py-2 rounded hover:bg-black"
  //           >
  //             ← Back
  //           </button>
  //         )}

  //         <h1 className={`text-${t.topBar.titleStyle.fontSize} font-${t.topBar.titleStyle.fontWeight} mb-4`}>
  //           {collection.title}
  //         </h1>

  //         {t.topBar.showSoundToggle && t.audio.ambient.src && (
  //           <button
  //             onClick={() => setMuted((m) => !m)}
  //             className="text-sm opacity-80 hover:opacity-100"
  //           >
  //             {muted ? "🔇 Muted" : "🔊 Sound"}
  //           </button>
  //         )}
  //       </div>

  //       {/* Hero section */}
  //       <div 
  //         className="relative overflow-hidden"
  //         style={{ height: t.hero.height.mobile }}
  //       >
  //         <div
  //           className="absolute inset-0"
  //           style={{
  //             background: `linear-gradient(to right, ${t.hero.gradient.from}, ${t.hero.gradient.via}, ${t.hero.gradient.to})`
  //           }}
  //         />

  //         {t.hero.image.src && (
  //           <img
  //             src={t.hero.image.src}
  //             alt={collection.title}
  //             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
  //             style={{
  //               width: t.hero.image.width.mobile,
  //               opacity: t.hero.image.opacity
  //             }}
  //           />
  //         )}
  //       </div>

  //       {/* Books rail */}
  //       <section className="mt-10 px-15">
  //         <h2 className="text-2xl font-semibold mb-6">
  //           {collection.title}
  //         </h2>

  //         <div 
  //           className="flex overflow-x-auto pb-6 scrollbar-hide"
  //           style={{ gap: t.booksRail.gap }}
  //         >
  //           {collection.books.map((book) => (
  //             <div
  //               key={book._id}
  //               onClick={() => {
  //                 whooshRef.current?.play();
  //                 setTimeout(() => {
  //                   // Replace with your router navigation
  //                   // navigate(`/book/${book._id}`);
  //                   window.location.href = `/book/${book._id}`;
  //                 }, t.booksRail.card.hover.transitionMs);
  //               }}
  //               className="mt-4 ml-2 mr-2 rounded-xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:ring-2"
  //               style={{
  //                 minWidth: t.booksRail.card.minWidth,
  //                 backgroundColor: t.booksRail.card.background,
  //                 transitionDuration: `${t.booksRail.card.hover.transitionMs}ms`
  //               }}
  //               onMouseEnter={(e) => {
  //                 e.currentTarget.style.transform = `translateY(-${t.booksRail.card.hover.liftAmount})`;
  //               }}
  //               onMouseLeave={(e) => {
  //                 e.currentTarget.style.transform = 'translateY(0)';
  //               }}
  //             >
  //               <div 
  //                 className="bg-black"
  //                 style={{ height: t.booksRail.card.image.height }}
  //               >
  //                 <img
  //                   src={`http://localhost:5000/uploads/${book.coverImage}`}
  //                   alt={book.title}
  //                   className="w-full h-full object-cover"
  //                 />
  //               </div>

  //               <div className="p-2">
  //                 <p className="font-semibold text-sm">
  //                   {book.title}
  //                 </p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </section>

  //       {/* Extra section */}
  //       {t.extraSection.enabled && (
  //         <section className="px-10 mt-20 text-gray-300 max-w-3xl">
  //           <h3 className="text-xl font-semibold mb-3 text-white">
  //             {t.extraSection.title}
  //           </h3>
  //           <p className="leading-relaxed">
  //             {t.extraSection.content}
  //           </p>
  //         </section>
  //       )}
  //     </div>
  //   );
  // }


// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function CollectionPage() {
//   const { collectionId } = useParams();
//   const navigate = useNavigate();

//   const [collection, setCollection] = useState(null);
//   const [theme, setTheme] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [muted, setMuted] = useState(false);

//   const bgAudioRef = useRef(null);
//   const whooshRef = useRef(null);

//   /* -------------------------
//      Tailwind safe mappings
//   -------------------------- */
//   const fontSizeMap = {
//     sm: "text-sm",
//     xl: "text-xl",
//     "2xl": "text-2xl",
//     "5xl": "text-5xl",
//   };

//   const fontWeightMap = {
//     normal: "font-normal",
//     semibold: "font-semibold",
//     bold: "font-bold",
//   };

//   /* -------------------------
//      Fetch collection
//   -------------------------- */
//   useEffect(() => {
//     const fetchCollection = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/collections/${collectionId}`
//         );
//         const data = await res.json();

//         setCollection(data);
//         setTheme(data.theme || getDefaultTheme());
//       } catch (err) {
//         console.error("Failed to load collection", err);
//         setTheme(getDefaultTheme());
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCollection();
//   }, [collectionId]);

//   /* -------------------------
//      Standalone redirect
//   -------------------------- */
//   useEffect(() => {
//     if (collection?.type === "standalone" && collection.bookId) {
//       navigate(`/chapters/${collection.bookId}`, { replace: true });
//     }
//   }, [collection, navigate]);

//   /* -------------------------
//      Ambient audio
//   -------------------------- */
//   useEffect(() => {
//     if (!bgAudioRef.current || !theme?.audio?.ambient) return;

//     bgAudioRef.current.volume = theme.audio.ambient.volume ?? 10;

//     if (theme.audio.ambient.autoplay && !muted) {
//       bgAudioRef.current.play().catch(() => {});
//     }
//   }, [theme, muted]);

//   /* -------------------------
//      Helpers
//   -------------------------- */

//   if (loading || !theme) {
//   return <p className="p-10">Loading…</p>;
// }


//   const heroHeight =
//     window.innerWidth >= 768
//       ? theme.hero.height.desktop
//       : theme.hero.height.mobile;

//   const gradientDirection = theme.hero.gradient.direction || "to right";

//   /* -------------------------
//      Guards
//   -------------------------- */
//   if (loading) return <p className="p-10">Loading…</p>;
//   if (!collection) return <p className="p-10">Collection not found</p>;
//   if (collection.type === "standalone") return null;

//   const t = theme;

//   /* =========================
//      RENDER
//   ========================== */
//   return (
//     <div
//       className="min-h-screen pb-24"
//       style={{
//         backgroundColor: t.page.background,
//         color: t.page.textColor,
//       }}
//     >
//       {/* AUDIO */}
//       {t.audio.ambient?.src && (
//         <audio
//           ref={bgAudioRef}
//           src={t.audio.ambient.src}
//           loop={t.audio.ambient.loop}
//           muted={muted}
//           preload="auto"
//         />
//       )}

//       {t.audio.interaction?.bookClick && (
//         <audio
//           ref={whooshRef}
//           src={t.audio.interaction.bookClick}
//           preload="auto"
//         />
//       )}

//       {/* TOP BAR */}
//       <div className="flex items-center justify-between px-8 py-4">
//         {t.topBar.showBackButton && (
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-black/70 px-4 py-2 rounded hover:bg-black"
//           >
//             ← Back
//           </button>
//         )}

//         <h1
//           className={`${fontSizeMap[t.topBar.titleStyle.fontSize]} ${
//             fontWeightMap[t.topBar.titleStyle.fontWeight]
//           }`}
//         >
//           {collection.title}
//         </h1>

//         {t.topBar.showSoundToggle && t.audio.ambient?.src && (
//           <button
//             onClick={() => setMuted((m) => !m)}
//             className="text-sm opacity-80 hover:opacity-100"
//           >
//             {muted ? "🔇 Muted" : "🔊 Sound"}
//           </button>
//         )}
//       </div>

//       {/* HERO */}
//       <div
//         className="relative overflow-hidden"
//         style={{ height: heroHeight }}
//       >
//         <div
//           className="absolute inset-0"
//           style={{
//             background: `linear-gradient(${gradientDirection}, ${t.hero.gradient.from}, ${t.hero.gradient.via}, ${t.hero.gradient.to})`,
//           }}
//         />

//         <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 "radial-gradient(circle at center, rgba(0,0,0,0.1), rgba(0,0,0,0.65))",
//             }}
//           />

//         {t.hero.image?.src && (
//           <img
//             src={t.hero.image.src}
//             alt={collection.title}
//             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
//             style={{
//               width:
//                 window.innerWidth >= 768
//                   ? t.hero.image.width.desktop
//                   : t.hero.image.width.mobile,
//               opacity: t.hero.image.opacity,
//             }}
//           />
//         )}
//       </div>

//       {/* BOOKS RAIL */}
//       <section className="mt-10 px-10">
//         <div
//           className="flex overflow-x-auto pb-6 scrollbar-hide"
//           style={{ gap: t.booksRail.gap }}
//         >
//           {collection.books.map((book) => (
//             <div
//               key={book._id}
//               onClick={() => {
//                 whooshRef.current?.play();
//                 setTimeout(() => {
//                   navigate(`/book/${book._id}`);
//                 }, t.booksRail.card.hover.transitionMs);
//               }}
//               onMouseEnter={(e) => {
//                 if (!t.booksRail.card.hover.lift) return;
//                 e.currentTarget.style.transform = `translateY(-${t.booksRail.card.hover.liftAmount})`;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//               }}
//               className="rounded-xl overflow-hidden shadow-xl cursor-pointer transition-all"
//               style={{
//                 minWidth: t.booksRail.card.minWidth,
//                 backgroundColor: t.booksRail.card.background,
//                 transitionDuration: `${t.booksRail.card.hover.transitionMs}ms`,
//               }}
//             >
//               <div style={{ height: t.booksRail.card.image.height }}>
//                 <img
//                   src={`http://localhost:5000/uploads/${book.coverImage}`}
//                   alt={book.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="p-3">
//                 <p className="font-semibold text-sm">{book.title}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* EXTRA SECTION */}
//       {t.extraSection.enabled && (
//         <section className="px-10 mt-20 max-w-3xl text-gray-300">
//           <h3 className="text-xl font-semibold text-white mb-3">
//             {t.extraSection.title}
//           </h3>
//           <p>{t.extraSection.content}</p>
//         </section>
//       )}
//     </div>
//   );
// }

// /* =========================
//    DEFAULT THEME
// ========================== */
// function getDefaultTheme() {
//   return {
//     page: { background: "#0b0f1a", textColor: "#ffffff" },
//     hero: {
//       height: { mobile: "320px", desktop: "380px" },
//       gradient: {
//         from: "#0b0f1a",
//         via: "#000000",
//         to: "#0b0f1a",
//         direction: "to right",
//       },
//       image: {
//         src: "",
//         width: { mobile: "620px", desktop: "700px" },
//         opacity: 0.7,
//       },
//     },
//     audio: {
//       ambient: { src: "", loop: true, autoplay: false, volume: 0.25 },
//       interaction: { bookClick: "" },
//     },
//     topBar: {
//       showBackButton: true,
//       showSoundToggle: true,
//       titleStyle: { fontSize: "5xl", fontWeight: "bold" },
//     },
//     booksRail: {
//       gap: "56px",
//       card: {
//         minWidth: "220px",
//         background: "#12182a",
//         hover: {
//           lift: true,
//           liftAmount: "12px",
//           transitionMs: 300,
//         },
//         image: { height: "320px" },
//       },
//     },
//     extraSection: {
//       enabled: false,
//       title: "",
//       content: "",
//     },
//   };
// }


import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resolveMedia } from "@/utils/resolveMedia";
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
      <div className="flex items-center justify-between px-8 py-4">
        {t.topBar.showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="bg-black/70 px-4 py-2 rounded hover:bg-black"
          >
            ← Back
          </button>
        )}

        <h1 className="text-5xl text-center font-display font-semibold">{collection.title}</h1>

        {t.topBar.showSoundToggle && t.audio.ambient?.src && (
          <button
            onClick={() => setMuted((m) => !m)}
            className="text-sm opacity-80 hover:opacity-100"
          >
            {muted ? "🔇 Muted" : "🔊 Sound"}
          </button>
        )}
      </div>

      {/* 🧙 HERO SECTION (TEMPLATE-SAFE) */}
      <div
        className="relative overflow-hidden"
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
                  : t.hero.image.width.mobile,
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
          className="flex overflow-x-auto pb-6 scrollbar-hide"
          style={{ gap: t.booksRail.gap }}
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
                minWidth: t.booksRail.card.minWidth,
                backgroundColor: t.booksRail.card.background,
                transitionDuration: `${t.booksRail.card.hover.transitionMs}ms`,
              }}
            >
              <div style={{ height: t.booksRail.card.image.height }}>
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
        <section className="px-10 mt-20 max-w-3xl text-gray-300">
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