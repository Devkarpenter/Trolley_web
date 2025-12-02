"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount (null while loading)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Error parsing saved user:", e);
      setUser(null);
    }
  }, []);

  // Save logged-in user + token
  const login = (userObj, token) => {
    // Accept either { id: "..."} or { _id: "..." }
    const id = userObj._id || userObj.id || userObj._id;
    const cleanUser = {
      _id: id,
      name: userObj.name,
      email: userObj.email,
      role: userObj.role || "user",
    };

    console.log("🔥 SAVING USER:", cleanUser);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(cleanUser));
    setUser(cleanUser);
  };

  // Normal email/password login
  const signIn = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // If server responded ok, it should contain data.user with role
      if (res.ok && data && data.user) {
        login(data.user, data.token);
        return { success: true };
      }

      return { success: false, message: data?.error || "Login failed" };
    } catch (err) {
      console.error("signIn error:", err);
      return { success: false, message: err.message };
    }
  };

  // Google login (assumes your /api/auth/google returns { user, token })
  const googleLogin = async (tokenId) => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenId }),
      });

      const data = await res.json();

      if (res.ok && data && data.user) {
        login(data.user, data.token);
        return { success: true };
      }

      return { success: false, message: data?.error || "Google login failed" };
    } catch (err) {
      console.error("googleLogin error:", err);
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, googleLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
