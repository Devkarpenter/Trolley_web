// app/api/admin/users/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken, requireAdmin } from "@/utils/auth";

export async function GET(req) {
  await connectDB();
  try {
    const { user } = await verifyToken(req);
    requireAdmin(user);
    const users = await User.find().select("-password").lean();
    return NextResponse.json({ ok: true, users });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
  }
}
