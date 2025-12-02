"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // 🔐 Redirect if NOT admin
  useEffect(() => {
    if (user === null) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }
  }, [user]);

  if (!user || user.role !== "admin") {
    return (
      <p className="text-center mt-20 text-gray-600 text-lg">
        Checking admin access...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Orders */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg cursor-pointer"
        >
          <Link href="/admin/orders">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                📦 Orders
              </h2>
              <p className="mt-2 text-blue-100">
                Manage all customer orders
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Users */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-purple-600 text-white p-8 rounded-2xl shadow-lg cursor-pointer"
        >
          <Link href="/admin/users">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                👤 Users
              </h2>
              <p className="mt-2 text-purple-100">
                View and manage users
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Products */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green-600 text-white p-8 rounded-2xl shadow-lg cursor-pointer"
        >
          <Link href="/admin/products">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                🛒 Products
              </h2>
              <p className="mt-2 text-green-100">
                Manage your product listings
              </p>
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
