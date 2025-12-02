"use client";
import ProtectedClient from "@/components/ProtectedClient";
import { useState } from "react";

export default function AddProductPage() {
  return (
    <ProtectedClient role="admin">
      <AddProduct />
    </ProtectedClient>
  );
}

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description: desc, price: Number(price), category })
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("Product added");
      setTitle(""); setPrice(""); setDesc(""); setCategory("");
    } else {
      setMsg(data.error || "Error");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      {msg && <div className="mb-3 p-2 bg-gray-100">{msg}</div>}
      <form className="space-y-3" onSubmit={submit}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price (INR)" className="w-full p-2 border rounded" />
        <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="w-full p-2 border rounded" />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Product</button>
      </form>
    </div>
  );
}
