"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;   // 🔥 REQUIRED to disable prerendering fully

import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-3 text-green-600">
        Order Placed Successfully ✔️
      </h1>

      {orderId && (
        <p className="text-gray-700 mb-2">
          Your Order ID:
          <span className="font-mono bg-gray-200 px-2 py-1 rounded ml-2">
            {orderId}
          </span>
        </p>
      )}

      <p className="text-gray-600 text-center">
        You will receive an email with order details shortly.
      </p>

      <a
        href="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
      >
        Continue Shopping
      </a>
    </div>
  );
}

