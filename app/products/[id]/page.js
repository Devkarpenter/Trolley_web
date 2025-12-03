"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../../context/cart-context";
import { AuthContext } from "../../../context/auth-context";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    loadData();
  }, [id]);

  if (!product) return <p className="p-6 text-lg">Loading...</p>;

  const cleanProduct = {
    id: product._id,
    name: product.name,
    price: product.price,
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">{product.name}</h1>

      <p className="mt-4 text-2xl font-semibold">₹{product.price}</p>

      <p className="text-gray-700 mt-6">{product.description}</p>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => addToCart(cleanProduct)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
