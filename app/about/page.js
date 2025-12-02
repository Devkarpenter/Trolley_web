"use client"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">

      {/* ⭐ Background decorative gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white blur-sm"></div>
      <div className="absolute top-0 left-0 w-60 h-60 bg-blue-300/20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-300/20 blur-[120px] rounded-full -z-10"></div>

      {/* ⭐ Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-16"
      >
        About <span className="text-blue-600">TrolleyMart</span>
      </motion.h1>

      {/* ⭐ About Content */}
      <div className="grid md:grid-cols-2 gap-16">

        {/* LEFT SECTION — Our Story */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2015, TrolleyMart began with a simple vision:  
            **to redefine travel comfort** by offering durable, stylish,
            and modern luggage solutions to everyone.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            From humble beginnings to a widely trusted brand, we’ve been
            committed to using premium materials, innovative designs, and
            traveler-friendly features.  
          </p>

          <p className="text-gray-700 leading-relaxed">
            Today, our products are used by **millions of travelers** who value
            reliability, durability, and modern aesthetics.
          </p>
        </motion.div>

        {/* RIGHT SECTION — Mission + Values Box */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To make travel **convenient, affordable, and enjoyable**
              through innovative designs and world-class customer support.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 shadow-sm">
            <h3 className="font-semibold text-xl mb-4">Our Core Values</h3>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li>✓ Quality & Durability</li>
              <li>✓ Customer Satisfaction</li>
              <li>✓ Innovation & Design</li>
              <li>✓ Sustainability</li>
            </ul>
          </div>

        </motion.div>
      </div>

      {/* ⭐ Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-3 gap-8 mt-20"
      >
        {[
          { number: "10M+", label: "Happy Travelers" },
          { number: "8+ Years", label: "of Trust & Quality" },
          { number: "150+", label: "Premium Products" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-8 text-center border border-gray-200 shadow"
          >
            <h3 className="text-4xl font-extrabold text-blue-600">{stat.number}</h3>
            <p className="text-gray-700 font-medium mt-2">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* ⭐ Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-xl p-10 shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We envision a world where travel is **seamless, stylish, and stress-free**.
          Our goal is to continue innovating in luggage design, offering
          smart compartments, lightweight materials, and enhanced security —
          ensuring every traveler’s journey is memorable and effortless.
        </p>
      </motion.div>
    </section>
  )
}
