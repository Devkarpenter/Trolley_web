import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { verifyToken } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { user } = await verifyToken(req);
    const { items, amount, paymentMethod, addressId } = await req.json();

    const dbUser = await User.findById(user._id);
    const addr = dbUser.addresses.id(addressId);

    if (!addr) {
      return NextResponse.json(
        { ok: false, error: "Address not found" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      userId: user._id,
      items,
      amount,
      paymentMethod,
      address: addr.toObject(),
    });

    return NextResponse.json({ ok: true, orderId: order._id });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
