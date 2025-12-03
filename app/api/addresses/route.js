import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/utils/auth";

export async function GET(req) {
  try {
    await connectDB();
    const { user } = await verifyToken(req);

    const dbUser = await User.findById(user._id).lean();
    return NextResponse.json({ ok: true, addresses: dbUser.addresses || [] });
  } catch (err) {
    console.error("GET ADDRESSES ERROR:", err);
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { user } = await verifyToken(req);

    const body = await req.json();
    const dbUser = await User.findById(user._id);

    dbUser.addresses.push(body);
    await dbUser.save();

    return NextResponse.json({ ok: true, addresses: dbUser.addresses });
  } catch (err) {
    console.error("POST ADDRESS ERROR:", err);
    return NextResponse.json({ ok: false, error: "Failed to save address" }, { status: 500 });
  }
}
