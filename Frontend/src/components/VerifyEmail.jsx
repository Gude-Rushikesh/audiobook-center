import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;


export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        // const API_BASE = import.meta.env.VITE_API_URL;
        const res = await axios.get(
          `${API_BASE}/api/auth/verify-email?token=${token}`
        );

        setStatus("success");
        setMessage(res.data.message);

        // redirect to login after short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.error || "Verification failed"
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

return (
  <div
    className="min-h-screen bg-cover bg-center relative"
    style={{
      backgroundImage: `url("/auth-bg.jpg")`,
    }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/55" />

    {/* Content */}
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          w-full max-w-md
          bg-[#f3ede4]
          rounded-2xl
          shadow-[0_30px_90px_rgba(0,0,0,0.6)]
          p-10
          border border-black/15
          text-center
        "
      >
        {/* STATUS ICON */}
        {status === "verifying" && (
          <div className="mb-6">
            <div className="w-12 h-12 mx-auto border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}

        {status === "success" && (
          <div className="mb-4 text-4xl text-green-700 font-serif">
            ✓
          </div>
        )}

        {status === "error" && (
          <div className="mb-4 text-4xl text-red-600 font-serif">
            ✕
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-3xl font-semibold mb-3">
          {status === "verifying" && "Verifying Email"}
          {status === "success" && "Email Verified"}
          {status === "error" && "Verification Failed"}
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-700 text-lg">
          {status === "verifying" && "Please wait while we confirm your email address."}
          {status !== "verifying" && message}
        </p>

        {/* REDIRECT HINT */}
        {status === "success" && (
          <p className="text-sm text-gray-500 mt-4">
            Redirecting you to login…
          </p>
        )}
      </motion.div>
    </div>
  </div>
);
}