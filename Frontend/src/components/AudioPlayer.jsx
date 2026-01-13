
import { useRef, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

const SPEEDS = [1, 1.25, 1.5, 2];

export default function AudioPlayer({ 
  book,
  chapter,
  chapters,
  currentIndex,
  onChangeChapter,
  
  }) {
  
  if (!chapter) return null;

  const audioRef = useRef(null);
  const saveIntervalRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);
  const isMobile = window.innerWidth < 768;



    const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
    touchCurrentY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
    const delta = touchCurrentY.current - touchStartY.current;

      if (delta > 100) {
        setIsExpanded(false);
      }
    };


  /* ---------------- TIME HELPERS ---------------- */

  const parseDuration = (str) => {
    if (!str) return 0;
    const parts = str.split(":").map(Number);

    if (parts.length === 3) {
      const [h, m, s] = parts;
      return h * 3600 + m * 60 + s;
    }

    if (parts.length === 2) {
      const [m, s] = parts;
      return m * 60 + s;
    }

    return 0;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const t = Math.floor(time);
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;

    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    }

    return `${m}:${s.toString().padStart(2, "0")}`;
  };

    useEffect(() => {
      const interval = setInterval(() => {
        fetch(`${API_BASE}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
      }, 10 * 60 * 1000); // every 10 min

      return () => clearInterval(interval);
    }, []);


      useEffect(() => {
      if (!("mediaSession" in navigator)) return;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: chapter.title,
        artist: book?.author || "Audiobook Center",
        album: book?.title || "Audiobook",
        artwork: [
          {
            src: `${API_BASE}/uploads/${book.coverImage}`,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
    }, [chapter]);


    useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.setActionHandler("play", togglePlay);
    navigator.mediaSession.setActionHandler("pause", togglePlay);

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      if (currentIndex > 0) {
        onChangeChapter(currentIndex - 1);
      }
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      if (currentIndex < chapters.length - 1) {
        onChangeChapter(currentIndex + 1);
      }
    });
  }, [chapter, currentIndex]);


    // this is newly added
    useEffect(() => {
    const onResize = () => {
      isMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------------- LOAD CHAPTER + RESUME ---------------- */
  

  useEffect(() => {
    if (!audioRef.current) return;

    const durationSeconds = parseDuration(chapter.duration);
    setTotalDuration(durationSeconds);

    const savedTime =
      Number(localStorage.getItem(`chapter-progress-${chapter._id}`)) || 0;

    audioRef.current.src =
      `${API_BASE}/api/stream?link=${encodeURIComponent(
        chapter.megaLink
      )}`;

    audioRef.current.load();

    audioRef.current.onloadedmetadata = () => {
      if (savedTime > 0 && savedTime < durationSeconds - 5) {
        audioRef.current.currentTime = savedTime;
        setCurrentTime(savedTime);
      }
      audioRef.current.play();
      setIsPlaying(true);
    };

    return () => {
      clearInterval(saveIntervalRef.current);
    };
  }, [chapter]);

  /* ---------------- SAVE PROGRESS ---------------- */

  useEffect(() => {
    if (!audioRef.current) return;

    saveIntervalRef.current = setInterval(() => {
      localStorage.setItem(
        `chapter-progress-${chapter._id}`,
        audioRef.current.currentTime.toString()
      );
    }, 3000);

    return () => clearInterval(saveIntervalRef.current);
  }, [chapter]);

  /* ---------------- CONTROLS ---------------- */

  useEffect(() => {
      const open = () => setIsExpanded(true);

      document.addEventListener("open-player", open);

      return () => {
        document.removeEventListener("open-player", open);
      };
    }, []);



    useEffect(() => {
        document.body.style.overflow = isExpanded ? "hidden" : "auto";

        return () => {
          document.body.style.overflow = "auto";
        };
      }, [isExpanded]);




  // Previous button
    const goToPreviousChapter = () => {
      if (!chapters || currentIndex <= 0) return;

    //save current progress
    localStorage.setItem(
      `chapter-progress-${chapter._id}`,
      audioRef.current.currentTime.toString()
    );

    onChangeChapter(currentIndex - 1);
    };




    // Play button Logic

    const togglePlay = () => {
      if (!audioRef.current) return;

      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };



    
    // Next button

    const goToNextChapter = () => {
    if (!chapters || currentIndex >= chapters.length - 1) return;

      localStorage.setItem(
        `chapter-progress-${chapter._id}`,
        audioRef.current.currentTime.toString()
      );

      onChangeChapter(currentIndex + 1);
    };

  const changeSpeed = () => {
    const next = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(next);
    audioRef.current.playbackRate = SPEEDS[next];
  };


    //handelEnded

    const handleEnded = () => {
      if (!chapters) return;

    // save completed chapter progress
    localStorage.setItem(
      `chapter-progress-${chapter._id}`,
      audioRef.current.duration.toString()
    );

    // if not last chapter, go next
    if (currentIndex < chapters.length - 1) {
      onChangeChapter(currentIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  /* ------------------ 30s JUMP --------------------- */

  const jumpBackward = () => {
    if (!audioRef.current) return;

    const newTime = Math.max(0, audioRef.current.currentTime - 30);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const jumpForward = () => {
    if (!audioRef.current) return;

    const newTime = Math.min(
      totalDuration,
      audioRef.current.currentTime + 30
    );
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /* ------------------------------------------------- */

  const handleSeek = (value) => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsBuffering(true);
    audioRef.current.currentTime = value;

    audioRef.current.oncanplay = () => {
      audioRef.current.play();
      setIsBuffering(false);
      setIsPlaying(true);
    };
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  /* ---------------- UI ---------------- */




//   return (
//     <>
//     <div className="fixed bottom-0 left-0 right-0 z-50">
//       <div className="backdrop-blur-xl bg-black/90 border-t border-white/10">
//         <div className="max-w-6xl mx-auto px-6 py-4 space-y-3 text-white">

//           {/* TITLE */}
//           <p className="text-sm truncate text-center text-white/80">
//             🎧 {chapter.title}
//           </p>

//           {/* CONTROLS */}
//           <div className="flex items-center gap-4">

//             {/* Previous Chapter */}
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToPreviousChapter();
//               }}
//               disabled={currentIndex === 0}
//               className="w-10 h-10 rounded-full bg-white text-black 
//                                 flex items-center justify-center
//                                hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//               ⏮
//               </button>




//             {/* PLAY */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 togglePlay();
//               }}
//               disabled={isBuffering}
//               className="w-10 h-10 rounded-full bg-white text-black
//                          flex items-center justify-center
//                          hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isPlaying ? "❚❚" : "▶"}
//             </button>




//             {/* Next Chapter */}
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToNextChapter();
//               }}
//               disabled={!chapters || currentIndex >= chapters.length - 1}
//               className="w-10 h-10 rounded-full bg-white text-black 
//                                flex items-center justify-center
//                                hover:scale-105 transition 
//                                disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//             ⏭
//             </button>




//             {/* ELAPSED */}
//             <span className="text-xs text-white/70 w-14 tabular-nums text-right">
//               {formatTime(currentTime)}
//             </span>



//             {/* PROGRESS */}
//             <input
//               type="range"
//               min="0"
//               max={totalDuration || 1}
//               value={currentTime}
//               onChange={(e) => handleSeek(Number(e.target.value))}
//               className="flex-1 h-1 rounded-full appearance-none
//                          bg-white/20 accent-red-500 cursor-pointer"
//             />



//             {/* TOTAL */}
//             <span className="text-xs text-white/70 w-14 tabular-nums">
//               {formatTime(totalDuration)}
//             </span>




//             {/* SPEED */}
//               <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 jumpBackward();
//               }}
//               className="text-xs px-2 py-1 rounded-md
//                         bg-black text-white hover:bg-white hover:text-black transition"
//               >
//                 ↺30s
//               </button>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   jumpForward();
//                 }}
//                 className="text-xs px-2 py-1 rounded-md
//                           bg-black text-white hover:bg-white hover:text-black transition"
//               >
//                 30s↻
//               </button>

//               <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 changeSpeed();
//               }}
//               className="text-xs px-3 py-1 rounded-md
//                          bg-white/10 hover:bg-white/20 transition"
//               >
//                 {SPEEDS[speedIndex]}x
//               </button> 

//           </div>

//           {isBuffering && (
//             <p className="text-xs text-white/50">
//               Buffering audio…
//             </p>
//           )}

//           <audio
//             ref={audioRef}
//             preload="metadata"
//             onTimeUpdate={handleTimeUpdate}
//             onWaiting={() => setIsBuffering(true)}
//             onPlaying={() => setIsBuffering(false)}
//             onEnded={handleEnded}
//             // onEnded={() => setIsPlaying(false)}
//           />
//           </div>
//         </div>
//       </div>


//                         {/* MOBILE MINI PLAYER */}
//             {isMobile && !isExpanded && (
//               <div
//                 className="fixed bottom-0 left-0 right-0 z-50
//                           bg-black/90 backdrop-blur-xl
//                           px-4 py-3 flex items-center gap-3"
//                 onClick={() => setIsExpanded(true)}
//               >
//                 {/* Thumbnail */}
//                 <div className="w-10 h-10 rounded-md overflow-hidden bg-white/10">
//                   <img
//                     src={
//                       book?.coverImage
//                         ? `${API_BASE}/uploads/${book.coverImage}`
//                         : "/placeholder-cover.jpg"
//                     }
//                     alt="cover"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Title */}
//                 <p className="flex-1 text-sm truncate text-white">
//                   {chapter.title}
//                 </p>

//                 {/* Play / Pause */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     togglePlay();
//                   }}
//                   className="w-10 h-10 rounded-full bg-white text-black
//                             flex items-center justify-center"
//                 >
//                   {isPlaying ? "❚❚" : "▶"}
//                 </button>
//               </div>
//             )}


//           {/* fullscreen JSX */}
        
// </>
// )}

return (
  <>
    {/* ================= DESKTOP PLAYER ================= */}
    {!isMobile && (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-black/90 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 space-y-3 text-white">

          {/* TITLE */}
          <p className="text-sm truncate text-center text-white/80">
            🎧 {chapter.title}
          </p>

          {/* CONTROLS */}
          <div className="flex items-center gap-4">

            {/* Previous Chapter */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousChapter();
              }}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-white text-black 
                                flex items-center justify-center
                               hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
              ⏮
              </button>




            {/* PLAY */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              disabled={isBuffering}
              className="w-10 h-10 rounded-full bg-white text-black
                         flex items-center justify-center
                         hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>




            {/* Next Chapter */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                goToNextChapter();
              }}
              disabled={!chapters || currentIndex >= chapters.length - 1}
              className="w-10 h-10 rounded-full bg-white text-black 
                               flex items-center justify-center
                               hover:scale-105 transition 
                               disabled:opacity-50 disabled:cursor-not-allowed"
            >
            ⏭
            </button>




            {/* ELAPSED */}
            <span className="text-xs text-white/70 w-14 tabular-nums text-right">
              {formatTime(currentTime)}
            </span>



            {/* PROGRESS */}
            <input
              type="range"
              min="0"
              max={totalDuration || 1}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="flex-1 h-1 rounded-full appearance-none
                         bg-white/20 accent-red-500 cursor-pointer"
            />



            {/* TOTAL */}
            <span className="text-xs text-white/70 w-14 tabular-nums">
              {formatTime(totalDuration)}
            </span>




            {/* SPEED */}
              <button
              onClick={(e) => {
                e.stopPropagation();
                jumpBackward();
              }}
              className="text-xs px-2 py-1 rounded-md
                        bg-black text-white hover:bg-white hover:text-black transition"
              >
                ↺30s
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  jumpForward();
                }}
                className="text-xs px-2 py-1 rounded-md
                          bg-black text-white hover:bg-white hover:text-black transition"
              >
                30s↻
              </button>

              <button
              onClick={(e) => {
                e.stopPropagation();
                changeSpeed();
              }}
              className="text-xs px-3 py-1 rounded-md
                         bg-white/10 hover:bg-white/20 transition"
              >
                {SPEEDS[speedIndex]}x
              </button> 

          </div>

          {isBuffering && (
            <p className="text-xs text-white/50">
              Buffering audio…
            </p>
          )}
          </div>
        </div>
      </div>
    )}

    {/* ================= MOBILE MINI PLAYER ================= */}
    {isMobile && !isExpanded && (
              <div
                className="fixed bottom-0 left-0 right-0 z-50
                          bg-black/90 backdrop-blur-xl
                          px-4 py-3 flex items-center gap-3"
                onClick={() => setIsExpanded(true)}
              >
                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-md overflow-hidden bg-white/10">
                  <img
                    src={
                      book?.coverImage
                        ? `${API_BASE}/uploads/${book.coverImage}`
                        : "/placeholder-cover.jpg"
                    }
                    alt="cover"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <p className="flex-1 text-sm truncate text-white">
                  {chapter.title}
                </p>

                {/* Play / Pause */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="w-10 h-10 rounded-full bg-white text-black
                            flex items-center justify-center"
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>
              </div>
    )}

    {/* ================= MOBILE FULLSCREEN ================= */}
    {isMobile && isExpanded && (
          <div className={`fixed inset-0 z-100 bg-black text-white md:hidden flex flex-col transform transition-transform duration-300 ease-out
              ${isExpanded ? "translate-y-0" : "translate-y-full"}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              >
              {/* //  onClick={(e) => e.stopPropagation()} */}
              
            {/* HEADER */}
            <div className="p-4 flex items-center justify-between">
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xl font-bold"
              >
                ⬇
              </button>
              <span className="text-sm opacity-70">
                Chapter {currentIndex + 1}
              </span>
              <div />
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">

              {/* BOOK POSTER */}
              <div className="w-64 h-100 rounded-2xl overflow-hidden shadow-2xl mb-2">
                <img
                  src={
                    book?.coverImage ? `${API_BASE}/uploads/${book.coverImage}`:"/placeholder-cover.jpg"
                  }
                  alt={book?.title || "Book cover"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CHAPTER TITLE */}
              <p className="text-center text-lg font-semibold mt-3 mb-2">
                {chapter.title}
              </p>

            </div>

            {/* CONTROLS AREA */}
            <div className="px-6 pb-8 space-y-6">

              {/* MAIN CONTROLS */}
              <div className="flex items-center justify-center gap-12">
                <button
                  onClick={goToPreviousChapter}
                  disabled={currentIndex === 0}
                  className="text-3xl disabled:opacity-30"
                >
                  ⏮
                </button>

                <button
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full bg-white text-black
                            flex items-center justify-center text-3xl shadow-lg"
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <button
                  onClick={goToNextChapter}
                  disabled={currentIndex >= chapters.length - 1}
                  className="text-3xl disabled:opacity-30"
                >
                  ⏭
                </button>
              </div>

              {/* JUMP + SPEED */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={jumpBackward}
                  className="px-4 py-2 rounded-full bg-white/10"
                >
                  ↺30s
                </button>

                <button
                  onClick={jumpForward}
                  className="px-4 py-2 rounded-full bg-white/10"
                >
                  30s↻
                </button>

                <button
                  onClick={changeSpeed}
                  className="px-4 py-2 rounded-full bg-white/10"
                >
                  {SPEEDS[speedIndex]}x
                </button>
              </div>

              {/* PROGRESS */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={totalDuration || 1}
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="w-full h-1 rounded-full bg-white/20 accent-red-500"
                />

                <div className="flex justify-between text-xs opacity-70">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

          <audio
            ref={audioRef}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onEnded={handleEnded}
            // onEnded={() => setIsPlaying(false)}
          />
  </>
);
}