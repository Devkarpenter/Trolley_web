"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-context";

export default function AdminProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  if (user && user.role !== "admin") {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        ❌ Access Denied — Admin Only
      </div>
    );
  }

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        console.log("ADMIN PRODUCTS RESPONSE:", data); // Debug

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }

      } catch (err) {
        console.error("ADMIN PRODUCT ERROR:", err);
        setProducts([]);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-20 text-xl">Loading Products...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">📦 All Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md p-4 border"
            >
              <div className="text-5xl mb-3">{p.image || "🛒"}</div>

              <h2 className="font-bold text-lg">{p.name}</h2>

              <p className="text-gray-500 mt-1">{p.category}</p>

              <p className="text-blue-600 font-bold mt-2">₹{p.price}</p>

              <p className="text-sm text-gray-500">
                Stock: {p.stock}
              </p>

              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white">
                  Edit
                </button>
                <button className="px-4 py-2 rounded-lg bg-red-600 text-white">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
