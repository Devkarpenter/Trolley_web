"use client"
import Link from "next/link"
import { motion } from "framer-motion"  // ⭐ NEW – Smooth animations

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* ⭐ BACKGROUND GLOW GRADIENTS (Modern visual appeal) */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-blue-500/20 blur-[150px] rounded-full"></div>
      <div className="absolute top-10 right-0 w-[350px] h-[350px] bg-indigo-500/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-400/10 blur-[120px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-16">
        
        {/* ⭐ LEFT SECTION — Animated Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight drop-shadow-sm"
          >
            Elevate Your  
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Travel Style</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl text-gray-700 mt-5 max-w-xl leading-relaxed"
          >
            Premium trolleys with lightweight frames, shock-resistant materials,  
            and ultra-smooth wheels. Designed for smarter, stress-free, stylish travel.
          </motion.p>

          {/* ⭐ CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex gap-5 mt-10"
          >
            <Link 
              href="/products"
              className="px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all"
            >
              Shop Now
            </Link>

            <Link 
              href="/about"
              className="px-7 py-3 border border-gray-400 hover:border-gray-700 text-gray-700 rounded-xl font-semibold hover:scale-105 transition-all"
            >
              Learn More
            </Link>
          </motion.div>

          {/* ⭐ Floating features row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-wrap gap-6 mt-12 text-gray-700"
          >
            {[
              ["⚡", "Ultra Lightweight"],
              ["🛡️", "Shock Resistant"],
              ["🚀", "Smooth Glide Wheels"],
              ["💼", "Premium Build"],
            ].map(([icon, label], i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-white/60 backdrop-blur-xl px-4 py-2 rounded-lg shadow-md border border-gray-200"
              >
                <span className="text-2xl">{icon}</span>
                <p className="font-medium">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ⭐ RIGHT SECTION — Floating Trolley Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.div 
            animate={{ y: [0, -18, 0] }}   // ⭐ Floating animation
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-10 h-[380px] md:h-[450px] flex items-center justify-center"
          >
            <span className="text-[120px] md:text-[150px] drop-shadow-md">🧳</span>

            {/* ⭐ Best Seller Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-5 right-5 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg"
            >
              🌟 Best Seller
            </motion.div>

            {/* ⭐ Price tag bubble */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-5 left-5 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-md text-sm font-semibold"
            >
              Starting at ₹1999
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ⭐ Scroll Indicator */}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-400 text-sm"
      >
        ↓ Scroll to explore
      </motion.div>
    </section>
  )
}
