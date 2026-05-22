import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./home.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import BookToAudio from "./components/BookToAudio.jsx";
import BookChapters from "./components/BookChapters.jsx";
import CollectionPage from "./components/CollectionPage.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import VerifyEmail from "./components/VerifyEmail";

// ✅ NEW: ProtectedRoute wrapper
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const listener = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
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
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CollectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chapters/:bookId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BookChapters onSelectChapter={setCurrentChapter} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-to-audio"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BookToAudio />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
