"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-context";

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    async function fetchOrders() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) setOrders(data.orders);
    }

    fetchOrders();
  }, [user]);

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center text-xl py-20 text-red-600">
        ❌ Access Denied — Admin Only
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">All Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-600 text-lg">No orders found.</p>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow border border-gray-200"
          >
            {/* Order ID */}
            <p className="text-lg font-semibold mb-2">
              Order ID:{" "}
              <span className="text-blue-600">{order._id}</span>
            </p>

            {/* User Info */}
            <p className="mt-2">
              <span className="font-semibold">User:</span>{" "}
              {order.user
                ? `${order.user.name} (${order.user.email})`
                : "Guest"}
            </p>

            {/* Amount */}
            <p className="mt-2">
              <span className="font-semibold">Total Amount:</span> ₹
              {order.amount}
            </p>

            {/* Status */}
            <p className="mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`inline-block px-3 py-1 rounded-full text-white ${
                  order.status === "paid"
                    ? "bg-green-600"
                    : order.status === "failed"
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </p>

            {/* Items */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Items:</h3>

              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="ml-4 text-gray-700 flex justify-between"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Created At */}
            <p className="text-sm text-gray-500 mt-4">
              Ordered on: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
