"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart-context";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cart, loaded, updateQuantity, removeFromCart } = useContext(CartContext);

  if (!loaded) return <div className="p-6">Loading cart...</div>;

  if (!cart || cart.length === 0) {
    return (
      <motion.div
        className="p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <Link href="/products" className="mt-4 inline-block text-blue-600">
          Continue shopping
        </Link>
      </motion.div>
    );
  }

  const total = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <motion.div
          className="lg:col-span-2 bg-white rounded p-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 },
                }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-600">₹{item.price}</div>

                  {/* Quantity Buttons */}
                  <div className="flex items-center gap-2 mt-2">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) - 1)
                      }
                      className="px-3 border rounded"
                    >
                      -
                    </motion.button>

                    <div className="px-3">{item.quantity}</div>

                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) + 1)
                      }
                      className="px-3 border rounded"
                    >
                      +
                    </motion.button>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 ml-4"
                    >
                      Remove
                    </motion.button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold">
                    ₹{item.price * (item.quantity || 1)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          className="bg-white rounded p-6 sticky top-20"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Link
              href="/checkout"
              className="block text-center bg-blue-600 text-white py-3 rounded"
            >
              Checkout
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
