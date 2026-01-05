// import { useRef, useState } from "react";

// export default function AudioPlayer({ title, src }) {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   const togglePlay = async () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (audio.paused) {
//       try {
//         await audio.play();
//         setIsPlaying(true);
//       } catch (err) {
//         console.error("Playback blocked:", err);
//       }
//     } else {
//       audio.pause();
//       setIsPlaying(false);
//     }
//   };

//   const formatTime = (time) => {
//     if (!time) return "0:00";
//     const mins = Math.floor(time / 60);
//     const secs = Math.floor(time % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 shadow-lg">
//       <div className="max-w-5xl mx-auto">

//         <p className="text-sm mb-2 truncate">🎧 {title}</p>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={togglePlay}
//             className="bg-white text-black px-4 py-2 rounded font-medium"
//           >
//             {isPlaying ? "Pause" : "Play"}
//           </button>

//           <input
//             type="range"
//             min="0"
//             max={duration || 1}
//             value={currentTime}
//             onChange={(e) => {
//               audioRef.current.currentTime = e.target.value;
//               setCurrentTime(e.target.value);
//             }}
//             className="flex-1"
//           />

//           <span className="text-sm w-24 text-right">
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </span>
//         </div>

//         <audio
//           ref={audioRef}
//           src={src}
//           controls
//           onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
//           onLoadedMetadata={() => setDuration(audioRef.current.duration)}
//           onEnded={() => setIsPlaying(false)}
//         />
//       </div>
//     </div>
//   );
// }



// import { useRef, useState, useEffect } from "react";

// export default function AudioPlayer({ chapter }) {
//   const audioRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);

//   // ✅ NEW: fixed duration from chapter.duration
//   const [totalDuration, setTotalDuration] = useState(0);

//   // ✅ NEW: helper to parse "10:12" → seconds
//   const parseDuration = (str) => {
//     if (!str) return 0;
//     const [m, s] = str.split(":").map(Number);
//     return m * 60 + s;
//   };

//   // 🔁 EXISTING logic (NOT BROKEN)
//   useEffect(() => {
//     if (!chapter || !audioRef.current) return;

//     // ✅ NEW: set fixed duration once
//     const seconds = parseDuration(chapter.duration);
//     setTotalDuration(seconds);
//     setCurrentTime(0);

//     // ❗ DO NOT TOUCH — streaming still works
//     audioRef.current.src =
//       `http://localhost:5000/api/stream?link=${encodeURIComponent(
//         chapter.megaLink
//       )}`;

//     audioRef.current.load();
//     audioRef.current.play();
//     setIsPlaying(true);
//   }, [chapter]);

//   // ❗ UNCHANGED
//   const togglePlay = () => {
//     if (!audioRef.current) return;

//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   // ❗ UNCHANGED (just cleaner)
//   const handleTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   // ✅ NEW: remaining time (countdown)
//   const remainingTime = Math.max(totalDuration - currentTime, 0);

//   const formatTime = (time) => {
//     if (!time || isNaN(time)) return "0:00";
//     const m = Math.floor(time / 60);
//     const s = Math.floor(time % 60);
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   return (
//   <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
//     <div className="max-w-6xl mx-auto space-y-3">

//       {/* 🎧 Chapter title */}
//       <p className="text-sm truncate opacity-80">
//         🎧 {chapter?.title || "Select a chapter"}
//       </p>

//       {/* 🔘 Controls + scrub */}
//       <div className="flex items-center gap-4">

//         {/* ▶️ / ⏸ Button (same logic) */}
//         <button
//           onClick={togglePlay}
//           className="w-10 h-10 flex items-center justify-center
//                      rounded-full bg-white text-black
//                      hover:scale-105 transition"
//         >
//           {isPlaying ? "❚❚" : "▶"}
//         </button>

//         {/* 🎚 Scrub bar (SAME VALUES, now draggable) */}
//         <input
//           type="range"
//           min="0"
//           max={totalDuration || 1}
//           value={remainingTime}
//           onChange={(e) => {
//             const seekTo = totalDuration - Number(e.target.value);
//             audioRef.current.currentTime = seekTo;
//             setCurrentTime(seekTo);
//           }}
//           className="
//             flex-1 h-1
//             appearance-none rounded-full
//             bg-gray-600
//             accent-red-500
//             cursor-pointer
//           "
//         />

//         {/* ⏳ Countdown */}
//         <span className="text-sm w-24 text-right tabular-nums">
//           {formatTime(remainingTime)} / {formatTime(totalDuration)}
//         </span>
//       </div>

//       {/* 🔊 AUDIO ELEMENT (UNCHANGED) */}
//       <audio
//         ref={audioRef}
//         preload="metadata"
//         onTimeUpdate={handleTimeUpdate}
//         onEnded={() => setIsPlaying(false)}
//       />
//     </div>
//   </div>
// );
// }


// import { useRef, useState, useEffect } from "react";

// export default function AudioPlayer({ chapter }) {
//   // ✅ SAFETY: do not render player if no chapter
//   if (!chapter) return null;

//   const audioRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);

// const formatTime = (time) => {
//   if (time === null || time === undefined || isNaN(time)) return "0:00";

//   const totalSeconds = Math.floor(time);

//   const h = Math.floor(totalSeconds / 3600);
//   const m = Math.floor((totalSeconds % 3600) / 60);
//   const s = totalSeconds % 60;

//   // 🔑 If duration is 1 hour or more, ALWAYS show hh:mm:ss
//   if (h > 0) {
//     return `${h}:${m.toString().padStart(2, "0")}:${s
//       .toString()
//       .padStart(2, "0")}`;
//   }

//   // Otherwise show mm:ss
//   return `${m}:${s.toString().padStart(2, "0")}`;
// };



//   useEffect(() => {
//     if (!audioRef.current) return;

//     const seconds = parseDuration(chapter.duration);
//     setTotalDuration(seconds);
//     setCurrentTime(0);

//     audioRef.current.src =
//       `http://localhost:5000/api/stream?link=${encodeURIComponent(
//         chapter.megaLink
//       )}`;

//     audioRef.current.load();
//     audioRef.current.play();
//     setIsPlaying(true);
//   }, [chapter]);

//   const togglePlay = () => {
//     if (!audioRef.current) return;

//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   const remainingTime = Math.max(totalDuration - currentTime, 0);

//   // const formatTime = (time) => {
//   //   if (!time || isNaN(time)) return "0:00";
//   //   const m = Math.floor(time / 60);
//   //   const s = Math.floor(time % 60);
//   //   return `${m}:${s < 10 ? "0" : ""}${s}`;
//   // };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
//       <div className="max-w-6xl mx-auto space-y-3">

//         <p className="text-sm truncate opacity-80">
//           🎧 {chapter.title}
//         </p>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={togglePlay}
//             className="w-10 h-10 flex items-center justify-center
//                        rounded-full bg-white text-black
//                        hover:scale-105 transition"
//           >
//             {isPlaying ? "❚❚" : "▶"}
//           </button>

//           <input
//             type="range"
//             min="0"
//             max={totalDuration || 1}
//             value={remainingTime}
//             onChange={(e) => {
//               const seekTo = totalDuration - Number(e.target.value);
//               audioRef.current.currentTime = seekTo;
//               setCurrentTime(seekTo);
//             }}
//             className="flex-1 h-1 appearance-none rounded-full
//                        bg-gray-600 accent-red-500 cursor-pointer"
//           />

//           <span className="text-sm w-24 text-right tabular-nums">
//             {formatTime(remainingTime)} / {formatTime(totalDuration)}
//           </span>
//         </div>

//         <audio
//           ref={audioRef}
//           preload="metadata"
//           onTimeUpdate={handleTimeUpdate}
//           onEnded={() => setIsPlaying(false)}
//         />
//       </div>
//     </div>
//   );
// }





// import { useRef, useState, useEffect } from "react";

// export default function AudioPlayer({ chapter }) {
//   // ✅ Do not render player if no chapter selected
//   if (!chapter) return null;

//   const audioRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);

//   /* =========================
//      PARSE DURATION (hh:mm:ss | mm:ss | ss)
//   ========================= */
//   const parseDuration = (str) => {
//     if (!str) return 0;

//     const parts = str.split(":").map(Number);

//     if (parts.length === 3) {
//       const [h, m, s] = parts;
//       return h * 3600 + m * 60 + s;
//     }

//     if (parts.length === 2) {
//       const [m, s] = parts;
//       return m * 60 + s;
//     }

//     return parts[0];
//   };

//   /* =========================
//      FORMAT TIME (AUTO hh:mm:ss)
//   ========================= */
//   const formatTime = (time) => {
//     if (time === null || time === undefined || isNaN(time)) return "0:00";

//     const totalSeconds = Math.floor(time);

//     const h = Math.floor(totalSeconds / 3600);
//     const m = Math.floor((totalSeconds % 3600) / 60);
//     const s = totalSeconds % 60;

//     // Show hours if duration >= 1 hour
//     if (h > 0) {
//       return `${h}:${m.toString().padStart(2, "0")}:${s
//         .toString()
//         .padStart(2, "0")}`;
//     }

//     return `${m}:${s.toString().padStart(2, "0")}`;
//   };

//   /* =========================
//      LOAD NEW CHAPTER
//   ========================= */
//   useEffect(() => {
//     if (!audioRef.current) return;

//     const seconds = parseDuration(chapter.duration);
//     setTotalDuration(seconds);
//     setCurrentTime(0);

//     audioRef.current.src =
//       `http://localhost:5000/api/stream?link=${encodeURIComponent(
//         chapter.megaLink
//       )}`;

//     audioRef.current.load();
//     audioRef.current.play();
//     setIsPlaying(true);
//   }, [chapter]);

//   /* =========================
//      PLAY / PAUSE
//   ========================= */
//   const togglePlay = () => {
//     if (!audioRef.current) return;

//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   /* =========================
//      TIME UPDATE
//   ========================= */
//   const handleTimeUpdate = () => {
//     if (!audioRef.current) return;
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
//       <div className="max-w-6xl mx-auto space-y-3">

//         {/* Chapter title */}
//         <p className="text-sm truncate opacity-80">
//           🎧 {chapter.title}
//         </p>

//         {/* Controls */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={togglePlay}
//             className="w-10 h-10 flex items-center justify-center
//                        rounded-full bg-white text-black
//                        hover:scale-105 transition"
//           >
//             {isPlaying ? "❚❚" : "▶"}
//           </button>

//           {/* Progress bar (elapsed time) */}
//           <input
//             type="range"
//             min="0"
//             max={totalDuration || 1}
//             value={currentTime}
//             onChange={(e) => {
//               const seekTo = Number(e.target.value);
//               audioRef.current.currentTime = seekTo;
//               setCurrentTime(seekTo);
//             }}
//             className="flex-1 h-1 appearance-none rounded-full
//                        bg-gray-600 accent-red-500 cursor-pointer"
//           />

//           {/* Time display */}
//           <span className="text-sm w-28 text-right tabular-nums">
//             {formatTime(currentTime)} / {formatTime(totalDuration)}
//           </span>
//         </div>

//         {/* Hidden audio element */}
//         <audio
//           ref={audioRef}
//           preload="metadata"
//           onTimeUpdate={handleTimeUpdate}
//           onEnded={() => setIsPlaying(false)}
//         />
//       </div>
//     </div>
//   );
// }


// import { useRef, useState, useEffect } from "react";

// export default function AudioPlayer({ chapter, onNextChapter }) {
//   if (!chapter) return null;

//   const audioRef = useRef(null);
//   const progressRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [buffered, setBuffered] = useState(0);

//   /* =========================
//      HELPERS
//   ========================= */
//   const parseDuration = (str) => {
//     if (!str) return 0;
//     const parts = str.split(":").map(Number);
//     if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
//     if (parts.length === 2) return parts[0] * 60 + parts[1];
//     return parts[0];
//   };

//   const formatTime = (time) => {
//     if (isNaN(time)) return "0:00";
//     const t = Math.floor(time);
//     const h = Math.floor(t / 3600);
//     const m = Math.floor((t % 3600) / 60);
//     const s = t % 60;
//     return h > 0
//       ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
//       : `${m}:${String(s).padStart(2, "0")}`;
//   };

//   /* =========================
//      LOAD CHAPTER
//   ========================= */
//   useEffect(() => {
//     if (!audioRef.current) return;

//     const savedTime = localStorage.getItem(`audio-${chapter._id}`) || 0;
//     const seconds = parseDuration(chapter.duration);

//     setTotalDuration(seconds);
//     setCurrentTime(Number(savedTime));

//     audioRef.current.src =
//       `http://localhost:5000/api/stream?link=${encodeURIComponent(
//         chapter.megaLink
//       )}`;

//     audioRef.current.currentTime = Number(savedTime);
//     audioRef.current.playbackRate = playbackRate;
//     audioRef.current.play();
//     setIsPlaying(true);
//   }, [chapter]);

//   /* =========================
//      TIME UPDATE + SAVE PROGRESS
//   ========================= */
//   const handleTimeUpdate = () => {
//     const audio = audioRef.current;
//     setCurrentTime(audio.currentTime);
//     localStorage.setItem(`audio-${chapter._id}`, audio.currentTime);

//     // Buffered progress
//     if (audio.buffered.length) {
//       const end = audio.buffered.end(audio.buffered.length - 1);
//       setBuffered((end / audio.duration) * 100);
//     }
//   };

//   /* =========================
//      CONTROLS
//   ========================= */
//   const togglePlay = () => {
//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const changeSpeed = () => {
//     const speeds = [1, 1.25, 1.5, 2];
//     const next = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
//     setPlaybackRate(next);
//     audioRef.current.playbackRate = next;
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
//       <div className="max-w-6xl mx-auto space-y-3">

//         {/* Title */}
//         <p className="text-sm truncate opacity-80">
//           🎧 {chapter.title}
//         </p>

//         {/* Controls Row */}
//         <div className="flex items-center gap-3">

//           {/* Play / Pause */}
//           <button
//             onClick={togglePlay}
//             className="w-10 h-10 rounded-full bg-white text-black"
//           >
//             {isPlaying ? "❚❚" : "▶"}
//           </button>

//           {/* ⏱️ Elapsed Time (LEFT) */}
//           <span className="text-sm w-20 text-right tabular-nums">
//             {formatTime(currentTime)}
//           </span>

//           {/* Progress */}
//           <div className="relative flex-1">
//             <div
//               className="absolute top-1/2 h-1 bg-gray-500 rounded"
//               style={{ width: `${buffered}%`, transform: "translateY(-50%)" }}
//             />
//             <input
//               ref={progressRef}
//               type="range"
//               min="0"
//               max={totalDuration || 1}
//               value={currentTime}
//               onChange={(e) => {
//                 const t = Number(e.target.value);
//                 audioRef.current.currentTime = t;
//                 setCurrentTime(t);
//               }}
//               className="w-full h-1 bg-gray-700 appearance-none cursor-pointer accent-red-500"
//             />
//           </div>

//           {/* ⏱️ Total Time (RIGHT) */}
//           <span className="text-sm w-20 tabular-nums">
//             {formatTime(totalDuration)}
//           </span>

//           {/* Speed */}
//           <button
//             onClick={changeSpeed}
//             className="px-2 py-1 text-sm bg-gray-700 rounded"
//           >
//             {playbackRate}x
//           </button>
//         </div>

//         <audio
//           ref={audioRef}
//           preload="metadata"
//           onTimeUpdate={handleTimeUpdate}
//           onEnded={() => {
//             setIsPlaying(false);
//             onNextChapter?.();
//           }}
//         />
//       </div>
//     </div>
//   );
// }






// import { useRef, useState, useEffect } from "react";

// export default function AudioPlayer({ chapter }) {
//   if (!chapter) return null;

//   const audioRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isBuffering, setIsBuffering] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);

//   /* ---------------- TIME HELPERS ---------------- */

//   const parseDuration = (str) => {
//     if (!str) return 0;
//     const parts = str.split(":").map(Number);

//     if (parts.length === 3) {
//       const [h, m, s] = parts;
//       return h * 3600 + m * 60 + s;
//     }

//     if (parts.length === 2) {
//       const [m, s] = parts;
//       return m * 60 + s;
//     }

//     return 0;
//   };

//   const formatTime = (time) => {
//     if (!time || isNaN(time)) return "0:00";

//     const total = Math.floor(time);
//     const h = Math.floor(total / 3600);
//     const m = Math.floor((total % 3600) / 60);
//     const s = total % 60;

//     if (h > 0) {
//       return `${h}:${m.toString().padStart(2, "0")}:${s
//         .toString()
//         .padStart(2, "0")}`;
//     }

//     return `${m}:${s.toString().padStart(2, "0")}`;
//   };

//   /* ---------------- LOAD NEW CHAPTER ---------------- */

//   useEffect(() => {
//     if (!audioRef.current) return;

//     const durationSeconds = parseDuration(chapter.duration);
//     setTotalDuration(durationSeconds);
//     setCurrentTime(0);

//     audioRef.current.src =
//       `http://localhost:5000/api/stream?link=${encodeURIComponent(
//         chapter.megaLink
//       )}`;

//     audioRef.current.load();
//     audioRef.current.play();
//     setIsPlaying(true);
//   }, [chapter]);

//   /* ---------------- CONTROLS ---------------- */

//   const togglePlay = () => {
//     if (!audioRef.current) return;

//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   const handleSeek = (value) => {
//     if (!audioRef.current) return;

//     audioRef.current.pause();
//     setIsBuffering(true);

//     audioRef.current.currentTime = value;

//     audioRef.current.oncanplay = () => {
//       audioRef.current.play();
//       setIsBuffering(false);
//       setIsPlaying(true);
//     };
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50">
//       <div className="backdrop-blur-xl bg-black/90 border-t border-white/10">
//         <div className="max-w-6xl mx-auto px-6 py-4 space-y-3 text-white">

//           {/* 🎧 TITLE */}
//           <p className="text-sm truncate text-white/80">
//             🎧 {chapter.title}
//           </p>

//           {/* 🎚 CONTROLS */}
//           <div className="flex items-center gap-4">

//             {/* PLAY / PAUSE */}
//             <button
//               onClick={togglePlay}
//               disabled={isBuffering}
//               className="w-11 h-11 rounded-full bg-white text-black
//                          flex items-center justify-center
//                          hover:scale-105 transition disabled:opacity-50"
//             >
//               {isPlaying ? "❚❚" : "▶"}
//             </button>

//             {/* ⏱ ELAPSED */}
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

//             {/* ⌛ TOTAL */}
//             <span className="text-xs text-white/70 w-14 tabular-nums">
//               {formatTime(totalDuration)}
//             </span>
//           </div>

//           {/* BUFFERING */}
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
//             onEnded={() => setIsPlaying(false)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }





import { useRef, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

const SPEEDS = [1, 1.25, 1.5, 2];

export default function AudioPlayer({ 
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




  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 z-50"
      onClick={() => {if (window.innerWidth < 768 && !isExpanded) {setIsExpanded(true);}}}>
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
                        bg-white/10 hover:bg-white text-black transition"
              >
                ↺30s
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  jumpForward();
                }}
                className="text-xs px-2 py-1 rounded-md
                          bg-white/10 hover:bg-white text-black transition"
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

          <audio
            ref={audioRef}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onEnded={handleEnded}
            // onEnded={() => setIsPlaying(false)}
          />
          </div>
        </div>
      </div>

          {isExpanded && (
              <div className="fixed inset-0 z-100 bg-black text-white md:hidden">

                {/* HEADER */}
                <div className="p-4 flex items-center justify-between">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-xl"
                  >
                    ⬇
                  </button>
                  <span className="text-sm opacity-70">
                    Chapter {currentIndex + 1}
                  </span>
                  <div />
                </div>

                {/* CENTER */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">

                  {/* Book Image Placeholder */}
                  <div className="w-56 h-56 rounded-2xl bg-white/10 flex items-center justify-center text-6xl">
                    📘
                  </div>

                  {/* Chapter Title */}
                  <p className="text-center text-lg font-medium">
                    {chapter.title}
                  </p>

                  {/* MAIN CONTROLS */}
                  <div className="flex items-center gap-10 mt-6">

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
                                flex items-center justify-center text-3xl"
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
                </div>

                {/* PROGRESS + JUMP */}
                <div className="px-6 pb-8 space-y-4">

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

                  <div className="flex justify-end gap-4">

                    <button onClick={jumpBackward} className="px-3 py-1 bg-white/10 rounded-md">
                      ↺30s
                    </button>

                    <button onClick={jumpForward} className="px-3 py-1 bg-white/10 rounded-md">
                      30s↻
                    </button>

                    <button onClick={changeSpeed} className="px-3 py-1 bg-white/10 rounded-md">
                      {SPEEDS[speedIndex]}x
                    </button>

                    </div>
                  </div>
                </div>
              )}
            </>
  )}