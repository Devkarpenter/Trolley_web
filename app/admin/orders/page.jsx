"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("ORDER LOAD ERROR:", err);
      }
      setLoading(false);
    }
    loadOrders();
  }, []);

  if (loading)
    return <p className="p-10 text-center text-lg">Loading orders...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded-md shadow">
              <h3 className="font-semibold">
                Order ID: <span className="text-blue-600">{order._id}</span>
              </h3>
              
              <p>Status: {order.status}</p>
              <p>Amount: ₹{order.amount}</p>

              <p className="mt-2 font-medium">Items:</p>
              <ul className="ml-4 list-disc">
                {order.items.map((i, idx) => (
                  <li key={idx}>
                    {i.name} - ₹{i.price} × {i.quantity}
                  </li>
                ))}
              </ul>

              <p className="mt-2 text-sm text-gray-500">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
