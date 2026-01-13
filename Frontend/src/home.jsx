import { Link } from "react-router-dom";
import relaxedImg from "./assets/photos/relaxed.jpg"; // relaxed listener image
import bgImg from "./assets/photos/forest.jpg"; // foggy forest background

function Home() {
  return (
            <div>
                {/* HEADER */}
              <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
                <div className="h-14 px-4 grid grid-cols-3 items-center">


                  <div />
                  
                  {/* CENTER TITLE (true center of screen) */}
                  <h1 className="text-center text-white font-display text-base sm:text-xl md:text-3xl tracking-widest">
                    Audiobook Center
                  </h1>

                  {/* RIGHT BUTTONS */}
                  <div className="flex justify-end gap-2">
                    <Link to="/register">
                      <button className="px-2 py-1.5 rounded-md bg-white text-black text-sm font-medium">
                        Register
                      </button>
                    </Link>
                    <Link to="/login">
                      <button className="px-2 py-1.5 rounded-md bg-white text-black text-sm font-medium">
                        Login
                      </button>
                    </Link>
                  </div>

                </div>
              </header>

      
    <div className="relative min-h-screen font-ui text-white">
      {/* FIXED BACKGROUND */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-black/25" />

      {/* SECTION 1 — INVITATION */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center px-6 text-center pt-20">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 max-w-5xl">
          We invite you into an immersive listening experience
        </h2>
        <p className="max-w-2xl text-base sm:text-lg md:text-2xl font-display text-white/80 leading-relaxed">
          Audiobook Center is a quiet space created for those who wish to step
          beyond the everyday and enter stories shaped by different minds,
          lives, and realities.
        </p>
      </section>

      <section className="flex justify-center px-4 mt-12">
        <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
          <img
            src={relaxedImg}
            alt="Relaxed listening"
            className="w-full aspect-video object-cover"
          />
        </div>
      </section>


      <section className="flex justify-center px-6 mt-20">
          <div className="max-w-3xl text-center">
            <div className="font-display text-base sm:text-lg md:text-2xl text-white/80 leading-snug md:leading-relaxed space-y-5 md:space-y-6">
              <p>
                To listen to a story is to momentarily leave your own world.
                This is time set aside for reflection, imagination, and presence.
              </p>

              <p>
                Through another person’s voice, thoughts, and choices, you
                experience perspectives that are not your own yet feel deeply human.
              </p>

              <p>
                Every story offers a way to understand life differently,
                to inhabit another reality, and to live, for a while, another life.
              </p>
              </div>
          </div>
        </section>

      {/* SECTION 5 — CTA */}
      <section className="flex flex-col items-center justify-center gap-4 mt-20 mb-24 px-6">
        <Link to="/register">
          <button className="px-8 py-3 rounded-md bg-white text-black text-base font-medium hover:bg-gray-100 transition">
            Start your journey
          </button>
        </Link>
      </section>


      {/* SECTION 6 — DISCLAIMER */}
      <footer className="py-4 px-4 text-center backdrop-blur-md bg-black/40 min-h-16 text-lg text-white">
        Audiobook Center is a personal project created for learning, exploration,
        and storytelling. All content and features are intended for educational
        and demonstrative purposes only.
      </footer>

    </div>
  </div>
  );
}

export default Home;





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