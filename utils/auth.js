// utils/auth.js
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function verifyToken(req) {
  // Try cookie or Authorization header
  let token = null;

  try {
    // Request might be a Next.js `Request` (app router)
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(^|;)\s*token=([^;]+)/);
    if (match) token = match[2];

    // Also support Authorization: Bearer ...
    if (!token) {
      const auth = req.headers.get("authorization");
      if (auth && auth.startsWith("Bearer ")) token = auth.split(" ")[1];
    }

    if (!token) throw new Error("No token");

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");

    const decoded = jwt.verify(token, secret);
    // decoded { id, role, iat, exp }
    await connectDB();
    const user = await User.findById(decoded.id).lean();
    if (!user) throw new Error("User not found");

    return { user, decoded };
  } catch (err) {
    throw err;
  }
}
