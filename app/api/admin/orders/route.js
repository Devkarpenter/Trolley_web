// app/api/admin/orders/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { verifyToken, requireAdmin } from "@/utils/auth";

export async function GET(req) {
  await connectDB();
  try {
    const { user } = await verifyToken(req);
    requireAdmin(user);
    const orders = await Order.find().lean();
    return NextResponse.json({ ok: true, orders });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
  }
}
