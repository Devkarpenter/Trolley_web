// app/api/cart/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { verifyToken } from "@/utils/auth";
import crypto from "crypto";

export async function GET(req) {
  await connectDB();

  try {
    let user = null;
    try {
      user = (await verifyToken(req)).user;
    } catch {
      user = null;
    }

    let cartId = req.cookies.get("cartId")?.value;
    let cart = null;

    if (user) {
      // Logged in → load user cart
      cart = await Cart.findOne({ userId: user._id }).lean();

      // If user has no cart but guest cart exists → migrate
      if (!cart && cartId) {
        const guestCart = await Cart.findOne({ cartId }).lean();
        if (guestCart) {
          cart = await Cart.findOneAndUpdate(
            { userId: user._id },
            { userId: user._id, items: guestCart.items },
            { upsert: true, new: true }
          );
          await Cart.deleteOne({ cartId });
        }
      }
    } else {
      // Guest user
      if (cartId) {
        cart = await Cart.findOne({ cartId }).lean();
      }
    }

    return NextResponse.json({
      ok: true,
      cart: cart?.items || [],   // <-- FIXED HERE
    });
  } catch (err) {
    console.error("GET CART ERROR:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();

  try {
    const { items } = await req.json();

    let user = null;
    try {
      user = (await verifyToken(req)).user;
    } catch {
      user = null;
    }

    let cartId = req.cookies.get("cartId")?.value;
    if (!user && !cartId) cartId = crypto.randomUUID();

    const query = user ? { userId: user._id } : { cartId };

    const updated = await Cart.findOneAndUpdate(
      query,
      { ...query, items, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    const res = NextResponse.json({
      ok: true,
      cart: updated.items || [],
    });

    if (!user) {
      res.cookies.set("cartId", cartId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return res;
  } catch (err) {
    console.error("POST CART ERROR:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
