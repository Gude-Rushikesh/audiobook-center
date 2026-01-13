
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "./utils/api"
// import axios from "axios";
// const API_BASE = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

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
      setLoading(true);

      await API.post(
        "/api/auth/register",
        { name: fullName, email, password },
        { timeout: 10000 }
      );

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2200);

    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url("/auth-bg.jpg")` }}
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
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded-xl mt-4"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium">
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
          </motion.div>
        </div>
      )}
    </div>
  );
}

