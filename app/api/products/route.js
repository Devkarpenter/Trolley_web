// app/api/products/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyToken, requireAdmin } from "@/utils/auth";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err) {
    console.error("PRODUCT API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { user } = await verifyToken(req);
    requireAdmin(user);
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: err.status || 401 });
  }
}
