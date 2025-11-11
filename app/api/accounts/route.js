import { databaseConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import Account from "@/models/Account";



// 🔹 GET — Fetch all accounts OR only for a specific seller, with sorting & limit
// 🔹 GET — Fetch all accounts OR only for a specific seller, with sorting & limit
export async function GET(req) {
  try {
    await databaseConnection();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const sortBy = searchParams.get("sortBy");
    const limit = Number(searchParams.get("limit"));

    // 🔸 Filter logic
    const filter = userId ? { createdBy: userId } : {};

    // 🔸 Sorting logic
    let sortQuery = {};
    switch (sortBy) {
      case "mostRated":
        sortQuery = { "rating.average": -1 };
        break;
      case "bestSelling":
        sortQuery = { salesCount: -1 };
        break;
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      case "priceLowToHigh":
        sortQuery = { price: 1 };
        break;
      case "priceHighToLow":
        sortQuery = { price: -1 };
        break;
      case "bestOffers":
        sortQuery = { discountPercentage: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    // 🔸 Execute query
    let query = Account.find(filter).sort(sortQuery);
    if (limit && !isNaN(limit)) {
      query = query.limit(limit);
    }

    const accounts = await query;

    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error("GET /api/accounts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch accounts", error: error.message },
      { status: 500 }
    );
  }
}

