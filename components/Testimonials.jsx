"use client"
import { motion } from "framer-motion"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      feedback: "The smooth wheels and build quality are just amazing! Best purchase.",
      emoji: "⭐",
    },
    {
      name: "Anjali Verma",
      feedback: "Lightweight and durable. Perfect for frequent travel.",
      emoji: "⭐",
    },
    {
      name: "Vikram Patel",
      feedback: "Stylish and very strong. I really loved the premium feel.",
      emoji: "⭐",
    },
  ]

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24">

      {/* ⭐ Decorative soft background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white blur-sm -z-10"></div>

      {/* ⭐ Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16"
      >
        What Our <span className="text-blue-600">Customers Say</span>
      </motion.h2>

      {/* ⭐ Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="grid md:grid-cols-3 gap-10"
      >
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="relative bg-white/70 backdrop-blur-xl p-10 rounded-2xl shadow-xl 
                       border border-gray-200 hover:shadow-blue-300/40 transition-all"
          >
            {/* ⭐ Animated Stars */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
              className="text-yellow-400 text-3xl mb-3 text-center"
            >
              {"⭐".repeat(5)}
            </motion.div>

            {/* Feedback */}
            <p className="text-gray-700 italic leading-relaxed text-center">
              "{t.feedback}"
            </p>

            {/* Customer Name */}
            <p className="mt-6 font-semibold text-gray-900 text-center text-lg">
              — {t.name}
            </p>

            {/* ⭐ Gradient underline */}
            <div className="mt-4 mx-auto w-20 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Extra background lights */}
      <div className="absolute -z-10 top-20 left-0 w-48 h-48 bg-blue-300/20 blur-[120px] rounded-full"></div>
      <div className="absolute -z-10 bottom-20 right-0 w-48 h-48 bg-indigo-300/20 blur-[120px] rounded-full"></div>
    </section>
  )
}
