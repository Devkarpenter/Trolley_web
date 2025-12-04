"use client";

import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// ⭐ Load Razorpay Script
function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}



export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loaded } = useContext(CartContext);
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    landmark: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState("");

  // 🚫 LOGIN GUARD
  useEffect(() => {
    if (loaded && !user) {
      router.push("/sign-in");
    }
  }, [loaded, user, router]);

  // Load saved addresses
  useEffect(() => {
    async function fetchAddresses() {
      if (!user) return;
      try {
        const res = await fetch("/api/addresses", { credentials: "include" });
        const data = await res.json();
        if (data.ok) {
          setAddresses(data.addresses);
          if (data.addresses.length > 0) {
            setSelectedAddressId(data.addresses[0]._id);
          }
        }
      } catch (e) {
        console.error("ADDRESS LOAD ERROR:", e);
      }
    }
    fetchAddresses();
  }, [user]);

  // Totals
  const subtotal = cart.reduce(
    (s, i) => s + i.price * (i.quantity || 1),
    0
  );
  const deliveryCharge = subtotal > 999 ? 0 : 49;
  const baseDiscount = subtotal > 1999 ? 150 : 0;
  const totalDiscount = baseDiscount + couponDiscount;
  const finalTotal = subtotal + deliveryCharge - totalDiscount;

  const estimatedDelivery = "3–5 days";

  async function saveAddress(e) {
    e.preventDefault();
    setOrderError("");

    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(addressForm),
      });
      const data = await res.json();
      if (data.ok) {
        setAddresses(data.addresses);
        setSelectedAddressId(
          data.addresses[data.addresses.length - 1]._id
        );
        setAddressForm({
          fullName: "",
          phone: "",
          pincode: "",
          line1: "",
          line2: "",
          city: "",
          state: "",
          landmark: "",
        });
      } else {
        setOrderError(data.error || "Failed to save address");
      }
    } catch (err) {
      setOrderError("Failed to save address");
    }
  }

  function applyCoupon() {
    setOrderError("");
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponDiscount(0);
      return;
    }
    if (code === "SAVE100") {
      setCouponDiscount(100);
    } else if (code === "FREEDEL") {
      setCouponDiscount(deliveryCharge);
    } else {
      setCouponDiscount(0);
      setOrderError("Invalid coupon code");
    }
  }

  // ⭐ FINAL Place Order with Razorpay
  async function placeOrder() {
  setOrderError("");

  if (!user) {
    router.push("/sign-in");
    return;
  }

  if (!cart.length) {
    setOrderError("Your cart is empty.");
    return;
  }

  if (!selectedAddressId) {
    setOrderError("Please select a delivery address.");
    return;
  }

  setLoading(true);

  try {
    // If COD → directly save order
    if (paymentMethod === "COD") {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: cart,
          amount: finalTotal,
          paymentMethod: "COD",
          addressId: selectedAddressId,
        }),
      });

      const data = await res.json();
      router.push(`/order-success?orderId=${data.orderId}`);
      return;
    }

    // 👉 RAZORPAY PAYMENT FLOW
    const create = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalTotal * 100,
      }),
    });

    const createData = await create.json();
    if (!createData.ok) {
      setOrderError("Failed to create Razorpay order.");
      return;
    }

    // load razorpay
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay failed to load");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: createData.order.id,
      amount: createData.order.amount,
      currency: "INR",
      name: "AccinziaDrifter Store",
      description: "Order Payment",

      handler: async (response) => {
        const verify = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const vData = await verify.json();

        if (!vData.ok) {
          router.push("/order-failed");
          return;
        }

        // save order
        const save = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            items: cart,
            amount: finalTotal,
            paymentMethod: "Razorpay",
            addressId: selectedAddressId,
          }),
        });

        const saveData = await save.json();
        router.push(`/order-success?orderId=${saveData.orderId}`);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    setOrderError("Payment failed!");
  }

  setLoading(false);
}


  return (
    <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
      
      {/* ---------------- LEFT SIDE ---------------- */}
      <div className="lg:col-span-2 space-y-6">

        {/* Delivery Address */}
        <motion.div
          className="bg-white rounded-xl shadow p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

          {addresses.length > 0 && (
            <div className="space-y-3 mb-4">
              {addresses.map((addr) => (
                <label
                  key={addr._id}
                  className={`border rounded-lg p-3 flex gap-3 cursor-pointer ${
                    selectedAddressId === addr._id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr._id}
                    checked={selectedAddressId === addr._id}
                    onChange={() => setSelectedAddressId(addr._id)}
                  />
                  <div>
                    <div className="font-semibold">
                      {addr.fullName} • {addr.phone}
                    </div>
                    <div className="text-sm text-gray-700">
                      {addr.line1}, {addr.city}, {addr.state} - {addr.pincode}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Add New Address */}
          <form onSubmit={saveAddress} className="space-y-3 mt-4">
            <h3 className="font-semibold mb-1">Add New Address</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <input type="text" placeholder="Full Name" className="border rounded p-2 text-sm"
                value={addressForm.fullName}
                onChange={(e) => setAddressForm(f => ({ ...f, fullName: e.target.value }))} required />
              <input type="text" placeholder="Phone" className="border rounded p-2 text-sm"
                value={addressForm.phone}
                onChange={(e) => setAddressForm(f => ({ ...f, phone: e.target.value }))} required />
              <input type="text" placeholder="Pincode" className="border rounded p-2 text-sm"
                value={addressForm.pincode}
                onChange={(e) => setAddressForm(f => ({ ...f, pincode: e.target.value }))} required />
              <input type="text" placeholder="City" className="border rounded p-2 text-sm"
                value={addressForm.city}
                onChange={(e) => setAddressForm(f => ({ ...f, city: e.target.value }))} required />
            </div>
            <input type="text" placeholder="Address Line 1" className="border rounded p-2 text-sm w-full"
              value={addressForm.line1}
              onChange={(e) => setAddressForm(f => ({ ...f, line1: e.target.value }))} required />
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white text-sm">
              Save Address
            </button>
          </form>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          className="bg-white rounded-xl shadow p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")} />
              <span>Cash on Delivery (COD)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="RAZORPAY"
                checked={paymentMethod === "RAZORPAY"}
                onChange={() => setPaymentMethod("RAZORPAY")} />
              <span>Online Payment (Razorpay)</span>
            </label>
          </div>
        </motion.div>

        {/* Coupon Box */}
        <motion.div
          className="bg-white rounded-xl shadow p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-3">Apply Coupon</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter coupon"
              className="border rounded p-2 flex-1 text-sm"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2 rounded bg-emerald-600 text-white text-sm"
            >
              Apply
            </button>
          </div>
        </motion.div>

        {orderError && (
          <div className="text-red-600 text-sm mt-2">{orderError}</div>
        )}
      </div>

      {/* ---------------- RIGHT SIDE ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl shadow p-5 h-fit lg:sticky lg:top-20"
      >
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Items ({cart.length})</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">- ₹{totalDiscount}</span>
          </div>

          <hr />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Estimated delivery: <span className="font-medium">{estimatedDelivery}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </motion.div>
    </div>
  );
}
