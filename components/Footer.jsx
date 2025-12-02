"use client";

import Link from "next/link";
import { useAuth } from "../context/auth-context";
import { motion } from "framer-motion";

export default function Footer() {
  const { user } = useAuth();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-[#0D0F1A] text-white pt-16 pb-10 mt-20 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* LOGO SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
            AccinziaDrifter
          </h2>
          <p className="text-gray-400 mt-4">
            Premium travel trolleys built for durability, comfort, and smooth travel.
          </p>

          <p className="text-gray-500 mt-4 text-sm">
            © {new Date().getFullYear()} AccinziaDrifter. All rights reserved.
          </p>
        </motion.div>

        {/* SHOP LINKS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Shop</h3>

          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/products" className="hover:text-blue-400 transition">All Products</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-blue-400 transition">Categories</Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-blue-400 transition">Cart</Link>
            </li>
          </ul>
        </motion.div>

        {/* COMPANY LINKS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Company</h3>

          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/about" className="hover:text-blue-400 transition">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            </li>
          </ul>
        </motion.div>

        {/* ACCOUNT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">Account</h3>

          <ul className="space-y-2 text-gray-300">
            {!user ? (
              <>
                <li>
                  <Link href="/sign-in" className="hover:text-blue-400 transition">Sign In</Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-blue-400 transition">Create Account</Link>
                </li>
              </>
            ) : (
              <>
                {/* Normal user dashboard */}
                <li>
                  <Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                </li>

                {/* ADMIN ONLY */}
                {user.role === "admin" && (
                  <>
                    <li>
                      <Link href="/admin/products" className="hover:text-purple-400 transition">
                        Admin Products
                      </Link>
                    </li>

                    <li>
                      <Link href="/admin/orders" className="hover:text-purple-400 transition">
                        Admin Orders
                      </Link>
                    </li>

                    <li>
                      <Link href="/admin/users" className="hover:text-purple-400 transition">
                        Admin Users
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm"
      >
        Built with ❤️ using Next.js, MongoDB, and Razorpay.
      </motion.div>
    </motion.footer>
  );
}
