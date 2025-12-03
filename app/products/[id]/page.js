"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/context/cart-context";
import { FiStar } from "react-icons/fi";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) return;

        const list = await res.json();
        const found = list.find(
          (p) => String(p._id) === String(id)
        );

        setProduct(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) return <p className="p-6 text-lg">Loading...</p>;
  if (!product) return <p className="p-6 text-lg">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* LEFT SECTION – Product Image */}
      <div className="flex items-center justify-center bg-white rounded-xl shadow-md p-10 h-[450px]">
        <span className="text-[150px]">
          {product.emoji || "🧳"}
        </span>
      </div>

      {/* RIGHT SECTION – Details */}
      <div>
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900">
          {product.name || product.title}
        </h1>

        {/* RATINGS */}
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className="text-yellow-500 text-xl" />
          ))}
          <span className="text-gray-600 ml-2">(245 Ratings)</span>
        </div>

        {/* PRICE SECTION */}
        <div className="mt-5">
          <p className="text-3xl font-bold text-green-600">
            ₹{product.price}
          </p>

          {product.oldPrice && (
            <p className="text-gray-500 line-through text-lg">
              MRP: ₹{product.oldPrice}
            </p>
          )}

          <p className="text-sm text-blue-600 mt-1 font-semibold">
            Inclusive of all taxes
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6 text-gray-700 leading-relaxed">
          {product.description ||
            "Premium trolley bag with large capacity, durable build and smooth wheels. Perfect for travel."}
        </div>

        {/* HIGHLIGHTS */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Highlights</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✔ High-Quality Durable Build</li>
            <li>✔ Lightweight and Travel Friendly</li>
            <li>✔ Smooth 360° Wheels</li>
            <li>✔ Strong Handle Support</li>
            <li>✔ Premium Material Finish</li>
          </ul>
        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex gap-4">
          <button
            onClick={() =>
              addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
              })
            }
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl text-lg font-semibold shadow-md"
          >
            Add to Cart
          </button>

          <button
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}




