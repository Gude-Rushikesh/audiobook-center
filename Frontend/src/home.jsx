// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import logoImg from "./assets/photos/logo.png";
// import bestImg from "./assets/photos/best.webp";


// function Home() {
//   const [rotate, setRotate] = useState(0);
//   const [scale, setScale] = useState(1);

// useEffect(() => {
//   let ticking = false;

//   const handleScroll = () => {
//     if (!ticking) {
//       window.requestAnimationFrame(() => {
//         const y = window.scrollY;

//         setRotate(Math.min(y / 8, 70));      // bold flip
//         setScale(Math.max(1 - y / 3000, 0.92));

//         ticking = false;
//       });

//       ticking = true;
//     }
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Header */}
//       <section className="border-b border-amber-50">
//         <div className="relative flex items-center justify-between bg-black h-14 px-6">
//           <h1 className="absolute left-1/2 -translate-x-1/2">
//             <img className="h-10 w-auto" src={logoImg} alt="logo" />
//           </h1>
//           <div className="flex items-center gap-3">
//             <Link to="/register">
//               <button className="text-black font-semibold bg-white border border-white rounded-md h-8 px-4">
//                 Register
//               </button>
//             </Link>
//             <Link to="/login">
//               <button className="text-black font-semibold bg-white border border-white rounded-md h-8 px-4">
//                 Login
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 1 — CARD FLIP */}
//       <section className="h-screen flex items-center justify-center" style={{ perspective:"1600px"}}>
//         <div
//           className="relative w-full h-full origin-center"
//           style={{
//             transform: `rotateX(${rotate}deg) scale(${scale})`,
//             transformStyle: "preserve-3d",
//           }}
//         >
//           <img
//             src={bestImg}
//             alt="hero"
//             className="absolute inset-0 w-full h-full object-cover"
//           />

//           <div className="absolute inset-0 bg-black/10" />

//           <div className="relative z-10 h-full flex items-center justify-center">
//             <h1 className="text-6xl font-bold tracking-wide text-white">
//               BOLD INTRO
//             </h1>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 2 — SAME IMAGE, DIFFERENT SIZE */}
//       <section className="min-h-screen flex items-center justify-center bg-black px-10">
//         <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">

//           {/* Framed Image */}
//           <div className="w-full max-w-[520px] aspect-video rounded-2xl overflow-hidden">
//             <video
//               className="
//                 w-full
//                 h-full
//                 object-cover
//               "
//               src="Frontend\src\assets\videos\1.mp4"
//               autoPlay
//               loop
//               muted
//               playsInline
//             />
//           </div>

//           {/* Content */}
//           <div>
//             <h2 className="text-4xl text-white font-semibold mb-6">
//               Same Image. New Perspective.
//             </h2>
//             <p className="text-gray-300 text-lg leading-relaxed">
//               After the bold transformation, the experience slows down.
//               The image becomes focused, intentional, and grounded —
//               letting the story breathe.
//             </p>
//           </div>

//         </div>
//       </section>
//       {/* Hero Section
//       <section className="">
//         <img
//           className="w-[165vh] h-[]items-center"
//           src={bestImg}
//           alt="background"
//         />
//       </section> */}
//     </div>
//   );
// }

// export default Home;















import { Link } from "react-router-dom";
import relaxedImg from "./assets/photos/relaxed.jpg"; // relaxed listener image
import bgImg from "./assets/photos/forest.jpg"; // foggy forest background

function Home() {
  return (
    <div>
      <div>
              {/* HEADER */}
              <header className="relative left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-black/40 h-16  flex items-center justify-between px-6 border-b border-white/10">
                <h1 className="text-white font-display text-3xl tracking-widest absolute left-1/2 -translate-x-1/2">
                  Audiobook Center
                </h1>
                <div className="flex gap-3">
                  <Link to="/register">
                    <button className="px-4 py-1.5 rounded-md bg-white text-black text-sm font-medium">
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="px-4 py-1.5 rounded-md bg-white text-black text-sm font-medium">
                      Login
                    </button>
                  </Link>
                </div>
              </header>
            </div>
      
    <div className="relative min-h-screen font-ui text-white">
      {/* FIXED BACKGROUND */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-black/25" />

      {/* SECTION 1 — INVITATION */}
      <section className="h-[40vh] flex flex-col items-center justify-center px-8 text-center">
        <h2 className="font-display text-5xl leading-tight mb-8 max-w-5xl">
          We invite you into an immersive listening experience
        </h2>
        <p className="max-w-2xl text-2xl font-display text-white/80 leading-relaxed">
          Audiobook Center is a quiet space created for those who wish to step
          beyond the everyday and enter stories shaped by different minds,
          lives, and realities.
        </p>
      </section>

      <section className="flex justify-center px-6 mt-15">
        <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={relaxedImg}
            alt="Relaxed listening"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>


      <section className="flex justify-center px-6 mt-24">
          <div className="max-w-3xl text-center">
            <p className="font-display text-lg md:text-2xl text-white/80 leading-relaxed space-y-6">
              <span className="block">
                To listen to a story is to momentarily leave your own world.
                This is time set aside for reflection, imagination, and presence.
              </span>

              <span className="block">
                Through another person’s voice, thoughts, and choices, you
                experience perspectives that are not your own yet feel deeply human.
              </span>

              <span className="block">
                Every story offers a way to understand life differently,
                to inhabit another reality, and to live, for a while, another life.
              </span>
            </p>
          </div>
        </section>

      {/* SECTION 4 — QUOTE
          <section className="h-[40vh] flex items-center justify-center px-8">
            <blockquote className="max-w-3xl text-center">
              <p className="font-display text-3xl md:text-4xl mb-6">
                “The mystery of life isn’t a problem to solve, but a reality to experience.”
              </p>
              <span className="text-white/70">
                — Frank Herbert
              </span>
            </blockquote>
          </section> */}


      {/* SECTION 2 — MEANING */}
      {/* <section className="py-20 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <p className="text-lg text-white/80 leading-relaxed space-y-6">
            <span className="block">
              Through another person’s voice, thoughts, and choices, you
              experience perspectives that are not your own — yet feel deeply human.
            </span>
            <span className="block">
              Every story offers a way to understand life differently, to inhabit
              another reality, and to live, for a while, another life.
            </span>
          </p>
        </div>
      </section> */}

      {/* SECTION 5 — CTA */}
      <section className="flex flex-col items-center justify-center gap-4 mt-24 mb-24 px-6">
        <Link to="/register">
          <button className="px-6 py-2.5 rounded-md bg-white text-black text-base font-medium hover:bg-gray-100 transition">
            Start your journey
          </button>
        </Link>
      </section>


      {/* SECTION 6 — DISCLAIMER */}
      <footer className="py-4 px-4 text-center backdrop-blur-md bg-black/40 h-16 text-lg text-white">
        Audiobook Center is a personal project created for learning, exploration,
        and storytelling. All content and features are intended for educational
        and demonstrative purposes only.
      </footer>

    </div>
  </div>
  );
}

export default Home;
