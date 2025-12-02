"use client";

import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  useEffect(() => {
    if (user === null) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (user.role === "admin") {
      router.push("/admin");
      return;
    }

    const loadOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
      setLoading(false);
    };

    loadOrders();
  }, [user]);

  if (user === null || loading) {
    return (
      <div className="flex justify-center mt-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Welcome Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-6"
      >
        Welcome,{" "}
        <span className="text-blue-600">{user.name}</span> 👋
      </motion.h1>

      {/* Orders Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-semibold mb-4"
      >
        Your Orders
      </motion.h2>

      {/* No Orders */}
      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-100 p-6 rounded-lg text-gray-600 text-center"
        >
          You haven't placed any orders yet 🛍️
        </motion.div>
      ) : (
        <motion.div variants={container} className="space-y-6">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order._id}
                variants={cardVariant}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white border rounded-xl shadow p-6"
              >
                {/* Order ID */}
                <p className="font-semibold text-lg">
                  Order ID:{" "}
                  <span className="text-blue-600">{order._id}</span>
                </p>

                {/* Status Tag */}
                <div className="mt-2">
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    {order.status}
                  </span>
                </div>

                {/* Amount */}
                <p className="mt-3 text-gray-700 font-medium">
                  Amount:{" "}
                  <span className="font-semibold">₹{order.amount}</span>
                </p>

                {/* Items */}
                <div className="mt-4">
                  <p className="font-semibold mb-2">Items:</p>
                  <ul className="space-y-2">
                    {order.items.map((item, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        className="bg-gray-50 p-3 rounded-lg flex justify-between"
                      >
                        <span>{item.name}</span>
                        <span>
                          ₹{item.price} × {item.quantity}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Date */}
                <p className="text-sm text-gray-500 mt-3">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
