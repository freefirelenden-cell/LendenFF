import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { databaseConnection } from "@/lib/db";

export async function GET(req, context) {
  try {
    await databaseConnection();
    const params = await context.params;
    const { id } = params
    const myOrder = await Order.findOne({accountId: id});

    return NextResponse.json({ message: "Order founded", success: true, order: myOrder });
  } catch (err) {
    return NextResponse.json(
      { message: "Server Error", error: err.message, success: false },
      { status: 500 }
    );
  }
}
