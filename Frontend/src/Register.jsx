import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;


export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid email!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // const API_BASE = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        name: fullName,
        email,
        password,
      });




    setShowSuccess(true);
     setTimeout(() => {
     navigate("/login");
    }, 2200);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
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
    <div className="absolute inset-0 bg-black/45" />

    {/* Content */}
    <div className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-16">

      {/* LEFT: REGISTER CARD */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            w-full max-w-md
            bg-[#f3ede4]
            rounded-2xl
            shadow-[0_30px_90px_rgba(0,0,0,0.6)]
            p-8
            border border-black/15
          "
        >
          <h1 className="text-3xl font-semibold text-center mb-6">
            Create Account
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl mt-4 hover:bg-blue-700 transition text-lg font-medium"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT: QUOTE SECTION */}
      <div className="hidden md:flex flex-col justify-center items-start text-white px-10">
        <p className="text-3xl font-serif italic leading-relaxed max-w-md">
          “There is more treasure in books than in all pirates's loot on Treasure Island.”
        </p>
        <span className="mt-4 text-lg font-semibold opacity-80">
          — Walt Disney
        </span>
      </div>

    </div>

    {showSuccess && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-[#f7f3ee] rounded-2xl px-10 py-8 text-center shadow-2xl max-w-md"
        >
          <h2 className="text-3xl font-serif mb-3 text-green-700">
            ✓ Account Created
          </h2>

          <p className="text-gray-700 text-lg">
            Please verify your email before logging in
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Redirecting to login…
          </p>

          {/* Decorative soft ribbons (same style as login) */}
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
                  background:
                    "linear-gradient(to top, #4ade80, #bbf7d0)",
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


