// app/api/orders/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import { verifyToken } from "@/utils/auth";

export async function POST(req) {
  await connectDB();
  try {
    const { user } = await verifyToken(req);
    const body = await req.json(); // { items, amount, currency, address, razorpayOrderId }
    let items = body.items;
    if (!items) {
      const cart = await Cart.findOne({ userId: user._id });
      items = cart ? cart.items : [];
    }

    const order = await Order.create({
      userId: user._id,
      items,
      amount: body.amount || 0,
      currency: body.currency || "INR",
      status: body.status || "created",
      razorpayOrderId: body.razorpayOrderId || null,
      address: body.address || {}
    });

    await Cart.findOneAndDelete({ userId: user._id });

    return NextResponse.json({ ok: true, order }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
  }
}

export async function GET(req) {
  await connectDB();
  try {
    const { user } = await verifyToken(req);
    if (user.role === "admin") {
      const orders = await Order.find().lean();
      return NextResponse.json({ ok: true, orders });
    }
    const orders = await Order.find({ userId: user._id }).lean();
    return NextResponse.json({ ok: true, orders });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
  }
}
