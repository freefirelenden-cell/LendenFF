import { NextResponse } from "next/server";
import User from "@/models/User";
import { databaseConnection } from "@/lib/db";

export async function GET(req) {
  try {
    await databaseConnection();

    // URL search params read
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || "seller"; // default: seller

    // Dynamic role filter
    const users = await User.find(
      { role },
      "name email phone image authId isTrusted role createdAt"
    );

    return NextResponse.json(
      { success: true, users },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET Users Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
