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


export default function App() {

  // 🔹 ADDED: global state to hold currently playing chapter
  // This is the SINGLE source of truth for audio
  const [currentChapter, setCurrentChapter] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const listener = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  return (
     <div className="font-ui">
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/collection/:collectionId" element={<CollectionPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />


        {/* 🔹 CHANGED: pass setter so BookDetails can select chapter */}
        {/* <Route
          path="/book/:bookId"
          element={<BookChapters onSelectChapter={setCurrentChapter} />}
        /> */}

          {/* Standalone books */}
        <Route
          path="/chapters/:bookId"
          element={<BookChapters onSelectChapter={setCurrentChapter} />}
        />

        {/* 🔐 Protected route untouched */}
        <Route
          path="/book-to-audio"
          element={
            localStorage.getItem("token")
              ? <BookToAudio />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
    </div>
  );
}
