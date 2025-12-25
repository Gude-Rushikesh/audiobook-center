
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // navigate("/book-to-audio"); // entry page
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/book-to-audio");
      }, 1800);
      } catch (err) {
          setError(err.response?.data?.error || "Login failed");
        }
      };


    return (
        <div
          className="min-h-screen bg-cover bg-center relative"
          style={{
            backgroundImage: "url('src/assets/photos/image2.jpg')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-16">
            
            {/* LEFT: LOGIN CARD */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                              w-full max-w-md
                              bg-[#f3ede4]
                              rounded-2xl
                              shadow-[0_25px_80px_rgba(0,0,0,0.55)]
                              p-8
                              border border-black/15
                            "

              >
                <h1 className="text-3xl font-semibold text-center mb-6">
                  Login
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                      type="password"
                      className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-red-500">{error}</p>}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-xl mt-4 hover:bg-blue-700 transition text-lg font-medium"
                  >
                    Login
                  </button>
                </form>

                {/* REGISTER CTA */}
                <p className="text-center text-gray-600 mt-6">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Register
                  </Link>
                </p>

                {/* Home link */}
                <p className="text-center mt-4">
                  <Link
                    to="/"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Home
                  </Link>
                </p>
              </motion.div>
            </div>

            {/* RIGHT: QUOTE SECTION */}
            <div className="hidden md:flex flex-col justify-center items-start text-white px-10">
              <p className="text-3xl font-serif italic leading-relaxed max-w-md">
                “A reader lives a thousand lives before he dies.”
              </p>
              <span className="mt-4 text-lg font-semibold opacity-80">
                — George R. R. Martin
              </span>
            </div>
          </div>


          {showSuccess && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#f7f3ee] rounded-2xl px-10 py-8 text-center shadow-2xl"
                >
                  <h2 className="text-3xl font-serif mb-2 text-green-700">
                    ✓ Login Successful
                  </h2>
                  <p className="text-gray-700">
                    Welcome back to your audiobook world
                  </p>

                  {/* Soft ribbons */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(14)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: -200, opacity: 1 }}
                            transition={{
                              duration: 2.2,
                              delay: i * 0.08,
                              ease: "easeOut",
                            }}
                            className="absolute left-1/2 w-1.5 h-12 rounded-full"
                            style={{
                              marginLeft: `${i * 10 - 70}px`,
                              background: "linear-gradient(to top, #d4af37, #f5deb3)",
                            }}
                          />
                        ))}
                      </div>
                </motion.div>
              </div>
            )}

        </div>
      );
    }
