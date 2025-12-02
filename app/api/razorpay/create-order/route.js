// app/api/razorpay/create-order/route.js
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const body = await req.json();
    const amount = body.amount; // integer paise
    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ ok: false, error: "Invalid amount" }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      return NextResponse.json({ ok: false, error: "Razorpay keys not configured" }, { status: 500 });
    }

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: amount,
      currency: body.currency || "INR",
      receipt: body.receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);

    // Return order and public key id to client
    return NextResponse.json({
      ok: true,
      order,
      key_id: key_id,
    });
  } catch (err) {
    console.error("create-order error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
