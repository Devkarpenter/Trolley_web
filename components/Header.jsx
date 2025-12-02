"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart-context";
import { useAuth } from "../context/auth-context";

import { motion, AnimatePresence } from "framer-motion";

import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

export default function Header() {
  const { cart, loaded } = useContext(CartContext);
  const { user, logout } = useAuth();
  const router = useRouter();

  const [count, setCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration issue
  useEffect(() => setMounted(true), []);

  // Cart count Safe Update
  useEffect(() => {
    if (loaded && Array.isArray(cart)) {
      setCount(cart.reduce((s, i) => s + (i.quantity || 0), 0));
    }
  }, [cart, loaded]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Navigation Links
  const navLinks = [
    { label: "Shop", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="backdrop-blur-md bg-white/70 shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <FiShoppingCart className="w-9 h-9 text-blue-600 drop-shadow-md" />

            <Link
              href="/"
              className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent tracking-tight"
            >
              AccinziaDrifter
            </Link>
          </motion.div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white shadow-inner outline-none border border-transparent focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.div key={i} whileHover={{ scale: 1.1 }} className="relative group">
                <Link
                  href={link.href}
                  className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>

                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
              </motion.div>
            ))}
          </nav>

          {/* User + Icons */}
          <div className="flex items-center space-x-5">
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="hidden sm:block text-gray-600 hover:text-blue-600 transition"
            >
              <FiHeart className="w-6 h-6" />
            </motion.button>

            {mounted && user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden sm:flex items-center space-x-3"
              >
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl shadow-sm">
                  <FiUser className="text-blue-600" />
                  <span className="text-sm font-semibold">{user.name}</span>
                </div>

                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium"
                >
                  Logout
                </button>
              </motion.div>
            ) : (
              <>
                <Link href="/sign-in" className="hidden sm:block font-medium hover:text-blue-600">
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <FiShoppingCart className="w-7 h-7 text-gray-700 hover:text-blue-600 transition" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <FiX className="w-8 h-8" /> : <FiMenu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="block px-4 py-2 bg-gray-100 hover:bg-blue-50 rounded-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}

              {/* User Section */}
              <div className="pt-3 border-t">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg mb-2">
                      <FiUser className="text-blue-600" />
                      <span>{user.name}</span>
                    </div>

                    <Link href="/dashboard" className="block py-2 font-medium">
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" className="block py-2 font-medium">
                      Sign In
                    </Link>
                    <Link href="/sign-up" className="block py-2 font-medium">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
