"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load saved user
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Error loading user:", e);
      setUser(null);
    }
  }, []);

  // Save login user
  const login = (userObj, token) => {
    const id = userObj._id || userObj.id;
    const cleanUser = {
      _id: id,
      name: userObj.name,
      email: userObj.email,
      role: userObj.role || "user",
    };

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

      if (res.ok && data.user) {
        login(data.user, data.token);
        return { success: true };
      }

      return { success: false, message: data?.error || "Login failed" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ⭐ GOOGLE LOGIN FIXED HERE ⭐
  const googleLogin = async (credential) => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }), // ✅ FIXED
      });

      const data = await res.json();

      if (res.ok && data.user) {
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
