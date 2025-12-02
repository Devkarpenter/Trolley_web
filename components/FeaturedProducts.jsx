"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function FeaturedProducts() {
  const products = [
    { id: 1, name: "AeroLite Pro 360°", price: "₹4,999", emoji: "🧳" },
    { id: 2, name: "Voyager Max 2.0", price: "₹6,499", emoji: "🎒" },
    { id: 3, name: "Titan HardShell", price: "₹7,999", emoji: "🛄" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">

      {/* ⭐ Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 to-transparent blur-xl"></div>

      {/* ⭐ Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-16 drop-shadow-sm"
      >
        Featured <span className="text-blue-600">Products</span>
      </motion.h2>

      {/* ⭐ Product Grid */}
      <div className="grid md:grid-cols-3 gap-10 relative">
        {products.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-blue-300/40 transition-all"
          >
            {/* ⭐ Floating emoji */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-7xl text-center mb-6 drop-shadow-sm"
            >
              {p.emoji}
            </motion.div>

            {/* ⭐ Product Name */}
            <h3 className="text-2xl font-bold text-center text-gray-900">{p.name}</h3>

            {/* ⭐ Price Badge */}
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center mt-3"
            >
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                {p.price}
              </span>
            </motion.div>

            {/* ⭐ CTA Button */}
            <Link href={`/products/${p.id}`}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium shadow-md shadow-blue-900/20 hover:shadow-blue-500/30 transition-all"
              >
                View Details
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ⭐ Decorative Gradient Circles */}
      <div className="absolute -z-10 top-10 left-20 w-60 h-60 bg-blue-300/20 blur-[120px] rounded-full"></div>
      <div className="absolute -z-10 bottom-10 right-20 w-60 h-60 bg-indigo-300/20 blur-[120px] rounded-full"></div>
    </section>
  );
}
