"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("PRODUCT LOAD ERROR:", err);
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (loading)
    return <p className="p-10 text-center text-lg">Loading products...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="border rounded-md shadow p-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>
              <p className="mt-1 font-bold">₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
