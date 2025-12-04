import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (hash === razorpay_signature) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Invalid signature" });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message });
  }
}
