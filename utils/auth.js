// utils/auth.js

import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

/**
 * Verify JWT token from Cookies or Authorization header
 */
export async function verifyToken(req) {
  let token = null;

  try {
    // ----- 1. Read token from Cookie -----
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(^|;)\s*token=([^;]+)/);
    if (match) token = match[2];

    // ----- 2. Authorization: Bearer <token> -----
    if (!token) {
      const auth = req.headers.get("authorization");
      if (auth && auth.startsWith("Bearer ")) {
        token = auth.split(" ")[1];
      }
    }

    if (!token) throw new Error("No token provided");

    // ----- 3. Verify Token -----
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");

    const decoded = jwt.verify(token, secret); // { id, role }

    // ----- 4. Fetch User -----
    await connectDB();
    const user = await User.findById(decoded.id).lean();

    if (!user) throw new Error("User not found");

    return { user, decoded };

  } catch (err) {
    throw err;
  }
}

/**
 * Require Admin Access
 * Used in /api/admin/* routes
 */
export function requireAdmin(user) {
  if (!user || user.role !== "admin") {
    throw new Error("Admin access required");
  }
}
