import { databaseConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import Account from "@/models/Account";



// 🔹 GET — Fetch all accounts OR only for a specific seller, with sorting & limit
export async function GET(req) {
  try {
    await databaseConnection();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const sortBy = searchParams.get("sortBy");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const skip = (page - 1) * limit;

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

    let query = Account.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const totalCount = await Account.countDocuments(filter);
    const accounts = await query;

    return NextResponse.json(
      { accounts, totalCount },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET /api/accounts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch accounts", error: error.message },
      { status: 500 }
    );
  }
}



// 🔹 POST — Add a new account (from Sell form)
export async function POST(req) {
  try {

    await databaseConnection();
    const body = await req.json();
    const images = Array.isArray(body.img)
      ? body.img.map(img => ({
        url: img.url?.toString(),
        fileId: img.fileId?.toString(),
      }))
      : [];


    const newAccount = new Account({
      title: body.title,
      rank: body.rank,
      price: body.price,
      img: images,
      description: body.description,
      stats: body.stats || {},
      uid: body.uid,
      email: body.email,
      password: body.password, // hashed automatically (if you add pre-save)
      status: "pending",
      createdBy: body.userId,
    });
    await newAccount.save()

    return NextResponse.json(
      { message: "Account submitted successfully", account: newAccount },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/accounts error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { message: "Failed to create account", error: error.message },
      { status: 500 }
    );
  }
}
