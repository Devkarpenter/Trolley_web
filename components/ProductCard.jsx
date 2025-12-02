"use client"
import { useContext } from "react"
import { CartContext } from "../context/cart-context"
import { motion } from "framer-motion"
import Link from "next/link"
import { FiStar } from "react-icons/fi"

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col"
    >
      {/* ⭐ Product Image or Emoji */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden mb-4"
      >
        <span className="text-7xl">{product?.emoji || "🧳"}</span>
      </motion.div>

      {/* ⭐ Product Title */}
      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
        {product.name}
      </h3>

      {/* ⭐ Short description */}
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {product.description || "Premium quality trolley designed for durability and smooth travel experience."}
      </p>

      {/* ⭐ Ratings */}
      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className="text-yellow-500" />
        ))}
        <span className="text-sm text-gray-500 ml-1">(245 Reviews)</span>
      </div>

      {/* ⭐ Price */}
      <p className="mt-3">
        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          ₹{product.price}
        </span>
      </p>

      {/* ⭐ Buttons */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-medium shadow-md hover:shadow-blue-400 transition-all hover:scale-[1.03]"
        >
          Add to Cart
        </button>

        <Link
          href={`/products/${product.id}`}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl text-center font-medium hover:border-gray-500 hover:text-gray-900 transition-all hover:scale-[1.03]"
        >
          View
        </Link>
      </div>
    </motion.div>
  )
}
