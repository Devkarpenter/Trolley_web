import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Admin protection
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  } catch (err) {
    console.log("⚠️ JWT ERROR");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
