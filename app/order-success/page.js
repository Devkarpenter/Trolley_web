"use client";

export const dynamic = "force-dynamic";   // 🔥 Prevent Vercel prerender error

import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-3 text-green-600">
        Order Placed Successfully ✔️
      </h1>

      {orderId && (
        <p className="text-gray-700 mb-2">
          Your Order ID:
          <span className="font-mono ml-1">{orderId}</span>
        </p>
      )}

      <p className="text-gray-600">
        You will receive an email with order details shortly.
      </p>
    </div>
  );
}
