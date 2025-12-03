"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/auth-context";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";

export default function SignIn() {
  const router = useRouter();
  const { signIn, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ⭐ NORMAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    router.push("/dashboard");
  };

  // ⭐ GOOGLE LOGIN CALLBACK (FIXED HERE)
  const handleGoogleResponse = async (res) => {
    console.log("GOOGLE RESPONSE:", res); // 🔥 VERY IMPORTANT

    if (!res || !res.credential) {
      setError("Google login failed (no credential)");
      return;
    }

    const result = await googleLogin(res.credential);

    if (!result.success) {
      setError("Google login failed");
      return;
    }

    router.push("/dashboard");
  };

  // GOOGLE BUTTON (WIDTH FIXED)
  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {
          theme: "outline",
          size: "large",
          width: 350, // 🔥 FIXED — must be NUMBER (not "100%")
        }
      );
    }
  }, []);

  return (
    <section className="flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 p-10 rounded-2xl shadow-xl"
      >
        <h1 className="text-4xl font-extrabold text-center mb-8">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        <div id="googleSignInDiv" className="w-full flex justify-center"></div>

        <p className="text-center text-gray-700 mt-6">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
