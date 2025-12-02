// app/api/razorpay/verify/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    // The client sends { razorpay_order_id, razorpay_payment_id, razorpay_signature }
    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return NextResponse.json({ ok: false, error: "Razorpay key secret not configured" }, { status: 500 });
    }

    // construct expected signature: HMAC_SHA256(order_id + "|" + payment_id, secret)
    const generated = crypto
      .createHmac("sha256", key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated === razorpay_signature) {
      // Payment verified
      // TODO: You may want to update DB order state here
      return NextResponse.json({ ok: true, success: true });
    } else {
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch (err) {
    console.error("verify error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
