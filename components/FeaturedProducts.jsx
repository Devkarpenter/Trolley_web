"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedProducts({ products }) {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
          Featured <span className="text-blue-600">Products</span>
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition-all"
            >
              {/* Product Image */}
              <div className="h-48 flex items-center justify-center mb-4 bg-gray-100 rounded-xl">
                <span className="text-7xl">{product.emoji}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {product.description}
              </p>

              {/* Price */}
              <p className="text-blue-600 font-semibold text-lg mb-4">
                ₹{product.price}
              </p>

              {/* ⭐ FIXED View Details Button */}
              <Link
                href={`/products/${product._id}`}
                className="block bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-all"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
