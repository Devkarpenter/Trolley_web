"use client"
import { motion } from "framer-motion"

export default function ShopByCategory() {
  const categories = [
    { name: "Carry-on Bags", emoji: "🧳" },
    { name: "Large Trolleys", emoji: "🛄" },
    { name: "Business Travel", emoji: "💼" },
    { name: "Kids Travel", emoji: "🎒" },
    { name: "Premium Edition", emoji: "✨" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">

      {/* ⭐ Soft glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 to-transparent blur-xl -z-10"></div>

      {/* ⭐ Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center"
      >
        Shop by <span className="text-blue-600">Category</span>
      </motion.h2>

      {/* ⭐ Animated Categories Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-5 gap-8"
      >
        {categories.map((c, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-200 hover:shadow-blue-200 cursor-pointer transition-all"
          >
            {/* Floating Emoji */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-6xl"
            >
              {c.emoji}
            </motion.div>

            {/* Category Name */}
            <p className="mt-5 font-semibold text-gray-900 text-lg">{c.name}</p>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative background blobs */}
      <div className="absolute -z-10 top-10 left-20 w-60 h-60 bg-blue-300/20 blur-[120px] rounded-full"></div>
      <div className="absolute -z-10 bottom-10 right-20 w-60 h-60 bg-indigo-300/20 blur-[120px] rounded-full"></div>
    </section>
  );
}
