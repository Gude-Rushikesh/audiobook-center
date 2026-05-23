import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./home.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import BookToAudio from "./components/BookToAudio.jsx";
import BookChapters from "./components/BookChapters.jsx";
import CollectionPage from "./components/CollectionPage.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import VerifyEmail from "./components/VerifyEmail";

// ✅ NEW: ProtectedRoute wrapper
function ProtectedRoute({ authLoading, isLoggedIn, children }) {
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] text-white">
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    const bootstrapSession = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrapSession();

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);

  return (
    <div className="font-ui">
      <Routes>
        {/* ✅ PUBLIC routes — no login needed */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* 🔐 PROTECTED routes — redirect to /login if not logged in */}
        <Route
          path="/collection/:collectionId"
          element={
            <ProtectedRoute authLoading={authLoading} isLoggedIn={isLoggedIn}>
              <CollectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chapters/:bookId"
          element={
            <ProtectedRoute authLoading={authLoading} isLoggedIn={isLoggedIn}>
              <BookChapters onSelectChapter={setCurrentChapter} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-to-audio"
          element={
            <ProtectedRoute authLoading={authLoading} isLoggedIn={isLoggedIn}>
              <BookToAudio />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
