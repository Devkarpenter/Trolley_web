import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

// Must match the Google button client ID (Frontend)
const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        { success: false, error: "Missing credential" },
        { status: 400 }
      );
    }

    // Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    await connectDB();

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        role: "user",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

    // Set secure cookie
    res.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}`
    );

    return res;
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Google login failed" },
      { status: 500 }
    );
  }
}
