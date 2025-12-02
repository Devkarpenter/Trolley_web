"use client"
import { motion } from "framer-motion"

export default function Why() {
  const features = [
    { emoji: "⚡", text: "Ultra-lightweight Material" },
    { emoji: "🛡️", text: "High Durability Protection" },
    { emoji: "🚀", text: "Smooth 360° Wheels" },
    { emoji: "🔒", text: "TSA-Approved Locks" },
    { emoji: "💼", text: "Premium Design Finish" },
    { emoji: "📦", text: "5-Year Warranty" },
  ]

  return (
    <section className="relative py-20 px-6 overflow-hidden">

      {/* ⭐ Background gradient waves */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white blur-sm -z-10"></div>
      <div className="absolute top-10 left-10 w-60 h-60 bg-blue-300/20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-300/20 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto">

        {/* ⭐ Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16"
        >
          Why <span className="text-blue-600">Choose Us</span>
        </motion.h2>

        {/* ⭐ Feature Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          {features.map((f, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="relative bg-white/70 backdrop-blur-xl p-10 rounded-2xl shadow-xl 
                         border border-gray-200 hover:shadow-blue-300/40 transition-all flex flex-col items-center"
            >
              {/* Floating Emoji */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-5xl"
              >
                {f.emoji}
              </motion.div>

              {/* Text */}
              <p className="mt-5 font-semibold text-gray-900 text-lg text-center">
                {f.text}
              </p>

              {/* Gradient underline animation */}
              <div className="mt-4 w-16 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
