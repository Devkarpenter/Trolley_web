// app/api/admin/products/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyToken, requireAdmin } from "@/utils/auth";

export async function GET(req) {
  await connectDB();
  try {
    const { user } = await verifyToken(req);
    requireAdmin(user);
    const products = await Product.find().lean();
    return NextResponse.json({ ok: true, products });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
  }
}
