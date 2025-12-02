import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // ❗ Google user has no password → must sign in with Google
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This account was created with Google Sign-In. Please use Google login.",
        },
        { status: 400 }
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Wrong password" },
        { status: 400 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cleanUser = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const res = NextResponse.json({
      success: true,
      user: cleanUser,
      token,
    });

    // Set cookie
    res.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}`
    );

    return res;
  } catch (error) {
    console.error("LOGIN API ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
