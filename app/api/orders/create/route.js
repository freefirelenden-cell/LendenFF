import { NextResponse } from "next/server";
import Order from "@/models/Order";
import User from "@/models/User";
import Account from "@/models/Account";   // ← tumhara account model
import { databaseConnection } from "@/lib/db";

export async function POST(req) {
  try {
    await databaseConnection();

    const body = await req.json();
    const { buyerId, sellerId, accountId, paymentMethod, paidAmount, buyerPhone } = body;

    if (!buyerId || !sellerId || !accountId) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Fetch buyer & seller info
    const buyer = await User.findOne({ authId: buyerId });
    const seller = await User.findOne({ authId: sellerId });

    if (!buyer || !seller) {
      return NextResponse.json(
        { message: "Buyer or Seller not found", success: false },
        { status: 404 }
      );
    }

    // Fetch account
    const account = await Account.findById(accountId).select("+password");
    if (!account) {
      return NextResponse.json(
        { message: "Account not found", success: false },
        { status: 404 }
      );
    }

    // Optional Snapshot (currently disabled)
    const snapshot = null;

    // Create order
    const newOrder = await Order.create({
      buyerId,
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      buyerPhone: buyerPhone,

      sellerId,
      sellerName: seller.name,
      sellerPhone: seller.phone,
      sellerEmail: seller.email,

      accountId: account._id,
      accountTitle: account.title,
      accountPrice: account.price,
      accountDetailsSnapshot: snapshot,

      paymentMethod,
      paidAmount,
      transactionId: body.transactionId || null,
      paymentScreenshot: body.paymentScreenshot || null,
    });


    return NextResponse.json({ message: "Order Created", success: true, order: newOrder, password: account.password });
  } catch (err) {
    return NextResponse.json(
      { message: "Server Error", error: err.message, success: false },
      { status: 500 }
    );
  }
}
