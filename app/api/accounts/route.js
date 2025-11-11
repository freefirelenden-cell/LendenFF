import { databaseConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import Account from "@/models/Account";



// 🔹 GET — Fetch all accounts OR only for a specific seller, with sorting & limit
export async function GET(req) {
  try {
    await databaseConnection();
    // const accounts = await Account.find({});
    let accounts = [{test: 'hello this is the test'}]
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error("GET /api/accounts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch accounts", error: error.message },
      { status: 500 }
    );
  }
}

