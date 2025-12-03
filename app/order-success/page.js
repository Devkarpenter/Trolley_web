"use client";

import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-3">Order Placed Successfully ✅</h1>
      {orderId && (
        <p className="text-gray-700 mb-2">
          Your order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}
      <p className="text-gray-600">You will receive an email with order details shortly.</p>
    </div>
  );
}
