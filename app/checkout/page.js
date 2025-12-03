"use client";

import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loaded } = useContext(CartContext);
  const [cartData, setCartData] = useState([]);
  const [loadingPay, setLoadingPay] = useState(false);
  const [error, setError] = useState(null);

  // compute totals correctly using quantity
  function computeTotals(items) {
    const subtotal = (items || []).reduce(
      (s, it) => s + (parseFloat(it.price) || 0) * (it.quantity || 1),
      0
    );
    return { subtotal, currency: "INR" };
  }

  useEffect(() => {
    if (!loaded) return;
    setCartData(cart);
  }, [loaded, cart]);

  async function createOrderOnServer(amountPaise) {
    const res = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: "trolley_receipt_" + Date.now(),
      }),
    });
    return res.json();
  }

  async function payNow() {
    setError(null);
    if (!cartData || cartData.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const { subtotal } = computeTotals(cartData);
    const amountPaise = Math.round(subtotal * 100);

    try {
      setLoadingPay(true);
      const json = await createOrderOnServer(amountPaise);

      const order = json.order || json;
      const keyId =
        json.key_id ||
        json.key ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (typeof window !== "undefined" && !window.Razorpay) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }

      const options = {
        key: keyId,
        amount: order.amount || amountPaise,
        currency: order.currency || "INR",
        name: "Trolley",
        description: "Order payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const v = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(response),
            });
            const verified = await v.json();
            if (verified.success || verified.ok) {
              router.push("/dashboard");
            } else {
              setError("Payment verification failed.");
            }
          } catch {
            setError("Payment verification failed.");
          }
        },
        theme: { color: "#3b82f6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message || "Payment flow failed");
    } finally {
      setLoadingPay(false);
    }
  }

  const { subtotal } = computeTotals(cartData);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      <div className="mb-6">
        {!loaded ? (
          <div>Loading cart...</div>
        ) : !cartData.length ? (
          <div>Your cart is empty</div>
        ) : (
          <motion.div>
            {cartData.map((it) => (
              <motion.div
                key={it.id}
                className="flex items-center mb-3"
              >
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm">Qty: {it.quantity}</div>
                </div>
                <div className="w-24 text-right">
                  ₹{(it.price * it.quantity).toFixed(2)}
                </div>
              </motion.div>
            ))}

            <motion.div className="mt-4 text-right">
              <div className="text-lg font-semibold">
                Subtotal: ₹{subtotal.toFixed(2)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div className="text-red-600 mb-4">
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={payNow}
        disabled={loadingPay}
        className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 disabled:opacity-60"
      >
        {loadingPay ? "Processing..." : "Pay Now"}
      </motion.button>
    </motion.div>
  );
}
